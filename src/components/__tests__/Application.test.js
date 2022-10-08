import React from "react";

import { render, cleanup, fireEvent, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, prettyDOM } from "@testing-library/react";

import  axios  from "axios";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
      
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("oads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is displayed.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument(); 

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment,"Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment,"Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container,"day").find(day => 
      queryByText(day, "Monday"));

    expect(getByText(day,"2 spots remaining")).toBeInTheDocument();
    });

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
      // 1. Render the Application.
      const { container, debug } = render(<Application />);
          
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click the "Edit" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
        );
      
      fireEvent.click(queryByAltText(appointment, "Edit"));
  
      // 4. Edit the name on the appointment. 
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      }); 
  
      // 5. Click the "Save" button on the appointment.
      fireEvent.click(getByText(appointment,"Save"));
  
      // 6. Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
  
      // 7. Wait until the element with the edited name is displayed.
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
      // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
      const day = getAllByTestId(container,"day").find(day => 
        queryByText(day, "Monday"));

      expect(getByText(day,"1 spot remaining")).toBeInTheDocument();
    });

    it("shows the save error when failing to save an appointment", async () => {
      axios.put.mockRejectedValueOnce();
  
      // 1. Render the Application.
      const { container, debug } = render(<Application />);
          
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click the "Edit" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
      
      fireEvent.click(queryByAltText(appointment, "Edit"));
  
      // 4. Edit the name on the appointment. 
      fireEvent.change(getByPlaceholderText(appointment, /enter Student Name/i), {
        target: { value: "Lydia Miller-Jones" }
      }); 
  
      // 5. Click the "Save" button on the appointment.
      fireEvent.click(getByText(appointment,"Save"));
  
      // 6. Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
  
      // 7. Wait until "Could not save appointment." is displayed.
      await waitForElement(() => getByText(appointment, "Could not save appointment."));
      expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
    });
  
    it("shows the delete error when failing to save an appointment", async () => {
      axios.delete.mockRejectedValueOnce();
  
      // 1. Render the Application.
      const { container, debug } = render(<Application />);
          
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click the "Delete" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
        
      fireEvent.click(queryByAltText(appointment, "Delete"));
  
      // 4. Check that the confirmation message is shown.
      expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument(); 
  
      // 5. Click the "Confirm" button on the confirmation.
      fireEvent.click(queryByText(appointment,"Confirm"));
  
      // 6. Check that the element with the text "Deleting" is displayed.
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
      // 7. Wait until "Could not delete appointment." is displayed.
      await waitForElement(() => getByText(appointment, "Could not delete appointment."));
      expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
    });
});

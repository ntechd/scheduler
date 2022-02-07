import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment"
import { describe } from "eslint/lib/testers/rule-tester";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
})

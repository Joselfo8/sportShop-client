import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Pagination from "../components/Pagination";

function Mock() {
  const [selectedPage, setSelectedPage] = useState(2);

  return (
    <Pagination
      onSelectedPage={setSelectedPage}
      selected={selectedPage}
      next={{ page: 3, limit: 8 }}
      previous={{ page: 1, limit: 8 }}
      maxPage={20}
    />
  );
}

describe("Pagination", () => {
  test("render page buttons", async () => {
    const user = userEvent.setup();

    render(<Mock />);
    const button4 = screen.getByText(/4/i);
    await user.click(button4);

    screen.getByText(/5/i);
  });
});

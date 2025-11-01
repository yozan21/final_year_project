import { useState } from "react";
import styled from "styled-components";
import { useUpdateStatus } from "../components/roomDetails/useUpdateStatus";

const Dropdown = styled.div`
  align-self: stretch;
  position: relative;
  display: flex;
`;

const MenuButton = styled.button`
  background: var(--primary);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const MenuList = styled.ul`
  position: absolute;
  top: -5rem;
  left: 0;
  background: linear-gradient(60deg, var(--surface), var(--background));
  border: 1px solid var(--background);
  border-radius: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 100;
`;

const MenuItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export default function ActionDropdown({ role, id, status }) {
  const [open, setOpen] = useState(false);

  const { updateStatus, isPending } = useUpdateStatus();

  // possible actions based on role & status
  const actions = [];

  if (role === "landlord" && status === "booked") {
    actions.push("Make Active");
  } else if (role === "admin") {
    if (status === "pending") {
      actions.push("Approve", "Reject");
    }
    if (status === "book-pending") {
      actions.push("Approve booking");
    }
  }

  const handleAction = (action) => {
    switch (action) {
      case "Make Active":
        return updateStatus({ id, status: "active" });
      case "Approve":
        return updateStatus({ id, status: "active" });
      case "Reject":
        return updateStatus({ id, status: "rejected" });
      case "Approve booking":
        return updateStatus({ id, status: "booked" });
    }
  };

  if (!actions.length) return null;

  return (
    <Dropdown>
      <MenuButton onClick={() => setOpen(!open)} disabled={isPending}>
        Actions ▾
      </MenuButton>
      {open && (
        <MenuList>
          {actions.map((action, i) => (
            <MenuItem key={i} onClick={() => handleAction(action)}>
              {action}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Dropdown>
  );
}

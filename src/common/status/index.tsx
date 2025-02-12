import React from "react";
import styled from "styled-components";

export type StatusType =
  | "Admin"
  | "Super Admin"
  | "User"
  | "Agent"
  | "Allowed"
  | "Success"
  | "Resolved"
  | "Progress"
  | "Open"
  | "Restricated"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | boolean;

interface StatusIndicatorProps {
  status?: StatusType;
  pale?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status = "Admin", pale = false }) => {
  let displayStatus: Exclude<StatusType, boolean>;
  if (typeof status === "boolean") {
    displayStatus = status ? "Admin" : "User";
  } else {
    displayStatus = status;
  }

  return (
    <StatusPill status={displayStatus} pale={pale}>
      {displayStatus}
    </StatusPill>
  );
};

const StatusPill = styled.div<{
  status: Exclude<StatusType, boolean>;
  pale?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  border-radius: 16px;
  font-size: 12px;
  background: #f1f1f1;
  color: #666666;
  width: fit-content;
  /* min-width: 100px; */

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    background: #666666;
  }

  ${({ status }) => {
    switch (status) {
      case "Super Admin":
      case "Progress":
        return `
          background: #E7F6FE;
          color: #0EA4E9;
          &::before { background: #0EA4E9; }
        `;
      case "Admin":
        return `background: #FEF8E6;
            color: #EAB208;
            &::before { background: #EAB208; }
          `;
      case "Success":
      case "Resolved":
      case "IN_TRANSIT":
        return `background: #ECF9F6;
            color: #40C4AA;
            &::before { background: #40C4AA; }
          `;
      case "Allowed":
        return `background: #ECF9F6;
            color: #40C4AA;
            &::before { background: #40C4AA; }
          `;
      case "Restricated":
      case "Open":
      case "PENDING":
        return `background: #FEE7EB;
            color: #F43F5D;
            &::before { background: #F43F5D; }
          `;

      case "User":
      case "Agent":
        return `
          background: #F0F2F4;
          color: #64748B;
          &::before { background: #64748B; }
        `;
      default:
        return `
          background: #F1F1F1;
          color: #666666;
          &::before { background: #666666; }
        `;
    }
  }}
`;

export default StatusIndicator;

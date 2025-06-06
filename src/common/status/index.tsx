import { capitalizeFirstLetter } from "@/utils/helper";
import React from "react";
import styled from "styled-components";

export type StatusType =
  | "admin"
  | "superadmin"
  | "user"
  | "active"
  | "inactive"
  | "agent"
  | "allowed"
  | "SUCCESS"
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
  | "SAFE"
  | "REPORTED"
  | "REVIEWING"
  | "RESOLVED"
  | boolean;

interface StatusIndicatorProps {
  status?: StatusType;
  pale?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status = "admin", pale = false }) => {
  let displayStatus: Exclude<StatusType, boolean>;
  if (typeof status === "boolean") {
    displayStatus = status ? "admin" : "user";
  } else {
    displayStatus = status;
  }

  return (
    <StatusPill status={displayStatus} pale={pale}>
      {capitalizeFirstLetter(displayStatus)}
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
      case "superadmin":
      case "Progress":
        return `
          background: #E7F6FE;
          color: #0EA4E9;
          &::before { background: #0EA4E9; }
        `;
      case "admin":
        return `background: #FEF8E6;
            color: #EAB208;
            &::before { background: #EAB208; }
          `;
      case "SUCCESS":
      case "Resolved":
      case "active":
      case "IN_TRANSIT":
        return `background: #ECF9F6;
            color: #40C4AA;
            &::before { background: #40C4AA; }
          `;
      case "allowed":
        return `background: #ECF9F6;
            color: #40C4AA;
            &::before { background: #40C4AA; }
          `;
      case "Restricated":
      case "Open":
      case "inactive":
      case "PENDING":
        return `background: #FEE7EB;
            color: #F43F5D;
            &::before { background: #F43F5D; }
          `;

      case "user":
      case "agent":
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

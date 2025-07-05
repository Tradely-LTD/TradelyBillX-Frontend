//@ts-nocheck
import { appPaths } from "@/utils/app-paths";
import {
  BarChart2,
  FileText,
  DollarSign,
  AlertTriangle,
  Settings2,
  Users,
  MapIcon,
  LogOut,
  FilePlus,
  FileSearch,
  UserSquare,
} from "lucide-react";

export const UserRoles = {
  AGENT: "agent",
  ADMIN: "admin",
  SUPER_ADMIN: "superadmin",
} as const;

export type UserRoleType = keyof typeof UserRoles;

interface SubmenuItem {
  label: string;
  path: string;
  icon: typeof FileText;
}

interface MenuItem {
  icon: typeof FileText;
  label: string;
  path: string;
  description: string;
  privilege: (typeof UserRoles)[UserRoleType][];
  hasSubmenu?: boolean;
  submenuItems?: SubmenuItem[];
}

export const getMenuItems = (UserType: (typeof UserRoles)[UserRoleType]): MenuItem[] => {
  return [
    {
      icon: BarChart2,
      label: "Dashboard",
      path: "/dashboard",
      description: "Overview of key metrics and performance",
      privilege: [UserRoles.AGENT, UserRoles.ADMIN],
    },
    {
      icon: Settings2,
      label: "System Configuration",
      path: appPaths.configuration,
      description: "Manage system settings and preferences",
      privilege: [UserRoles.SUPER_ADMIN],
    },
    {
      icon: Users,
      label: "User Management",
      path: "/users",
      description: "Manage system users and permissions",
      privilege: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
    },
    {
      icon: UserSquare,
      label: "Union Management",
      path: "/union",
      description: "Manage system unions",
      privilege: [UserRoles.SUPER_ADMIN],
    },
    {
      icon: MapIcon,
      label: "Location Management",
      path: "/location",
      description: " ",
      privilege: [UserRoles.SUPER_ADMIN],
    },
    {
      icon: FileText,
      label: "Waybill",
      path: "/waybill",
      hasSubmenu: true,
      submenuItems: [
        {
          label: "Create Waybill",
          path: "/waybill",
          icon: FilePlus,
        },
        {
          label: "View All Waybills",
          path: "/waybill/list",
          icon: FileSearch,
        },
      ],
      description: "Manage shipping documents and tracking",
      privilege: [UserRoles.AGENT, UserRoles.ADMIN],
    },
    {
      icon: DollarSign,
      label: "Transaction History",
      path: appPaths.transaction,
      description: "View and manage financial transactions",
      privilege: [UserRoles.AGENT, UserRoles.ADMIN],
    },
    {
      icon: AlertTriangle,
      label: "Incident Reporting",
      path: "/incidents",
      description: "Report and track delivery incidents",
      privilege: [UserRoles.AGENT],
    },
    // {
    //   icon: Activity,
    //   label: "Activity Logs",
    //   path: "/activity",
    //   description: "System and user activity monitoring",
    //   privilege: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
    // },
    // {
    //   icon: PieChart,
    //   label: "Commission Tracker",
    //   path: "/commission",
    //   description: "Track and manage delivery commissions",
    //   privilege: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
    // },
    {
      icon: LogOut,
      label: "Logout",
      path: "/login",
      description: "Logout",
      privilege: [UserRoles.AGENT, UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
    },
  ].filter(({ privilege }) => privilege.includes(UserType));
};

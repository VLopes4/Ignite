import { useContext } from "react";
import { SidebarDrawerContext } from "../contexts/SidebarDrawer";

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
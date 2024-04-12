import { AppDispatch, RootState } from "@/states";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

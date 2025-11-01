import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useDispatch.withTypes<RootState>();

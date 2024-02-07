import { io } from "socket.io-client";
const socket = io(`${process.env.EXPO_PUBLIC_ABA_BASE_URL_KEY}`)
export default socket;
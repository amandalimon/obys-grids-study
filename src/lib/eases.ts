import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

export const easeIn = CustomEase.create("css-ease-in", "0.42,0,1,1")
export const easeOut = CustomEase.create("css-ease-out", "0,0,0.58,1")

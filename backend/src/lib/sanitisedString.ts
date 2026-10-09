import * as z from "zod"
import DOMPurify from "isomorphic-dompurify"

const sanitisedString = z.string().transform((v) => (
    DOMPurify.sanitize(v.trim())
))

export default sanitisedString
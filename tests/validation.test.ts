import { z } from "zod";

describe("zod", () => {
    it("should support validation", async () => {
        const schema = z.string().min(3).max(100);

        const req = "eko";
        const result = schema.parse(req);

        expect(result).toBe("eko");
    });

    it("should support data conversion", async () => {
        const boolSchema = z.coerce.boolean();

        const req = "true";
        const result = boolSchema.parse(req);

        console.info(result);
        expect(result).toBe(true);
    });

    it("should support date", async () => {
        const dateSchema = z.date();

        // const req = new Date()
        const req = new Date(1990, 0, 1);
        const result = dateSchema.parse(req);
        console.info(result);
    });

    it("should return error", async () => {
        const schema = z.string().email().min(3).max(100);

        try {
            schema.parse("ek");
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.errors.forEach((err) => {
                    console.info(err.message);
                });
                // console.info(err.issues)
            }
        }
    });

    it("should return error without execption", async () => {
        const schema = z.string().email().min(3).max(100);

        const result = schema.safeParse("ek0@gmail.com");
        if (!result.success) {
            console.info(result.error);
        } else {
            console.info(result);
        }
    });

    it('should validate object', async () => {
        const schema = z.object({
            username: z.string().email(),
            password: z.string().min(3).max(100),
        })

        const req = {
            username: "ek0@gmail.com",
            password: "eko",
        }

        const result = schema.safeParse(req);
        console.info(result)
    })

    it('should validate custom erroy', async () => {
        const schema = z.object({
            username: z.string().email("username harus email"),
            password: z.string().min(6, "password min harus 6 karakter").max(20, "password max harus 20 karakter"),
        })

        const req = {
            username: "ek0@gmail.com",
            password: "123456",
        }

        try {
            const result = schema.parse(req);
            console.info(result)
        } catch (err) {
            console.error(err)
        }
    })

    it('should optional validate', async () => {
        const schema = z.object({
            username: z.string().email("username harus email").optional(),
            password: z.string().min(6, "password min harus 6 karakter").max(20, "password max harus 20 karakter"),
        })

        const req = {
            username: "ek0@gmail.com",
            password: "123456",
        }

        try {
            const result = schema.parse(req);
            console.info(result)
        } catch (err) {
            console.error(err)
        }
    })
});

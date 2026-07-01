export const VALIDATION = {
  email: {
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Please enter a valid email",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&]).{8,}$/,
      message:
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character (!@#$%&)",
    },
  },
  confirmPassword: (password: string) => ({
    validate: (value: string) =>
      value === password || "Passwords do not match",
  }),
} as const;

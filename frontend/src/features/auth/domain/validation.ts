export type SignInErrors = Partial<Record<"email" | "password", string>>;

export type SignUpErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "password" | "terms", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignIn(email: string, password: string): SignInErrors {
  const errors: SignInErrors = {};

  if (!email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateSignUp(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}): SignUpErrors {
  const errors: SignUpErrors = validateSignIn(input.email, input.password);

  if (input.firstName.trim().length < 2) {
    errors.firstName = "Enter your first name.";
  }

  if (input.lastName.trim().length < 2) {
    errors.lastName = "Enter your last name.";
  }

  if (!input.termsAccepted) {
    errors.terms = "Accept the Terms & Conditions to continue.";
  }

  return errors;
}

"use server";

import { createMessage } from "@/lib/db";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
}

const budgets = ["<$1k", "$1k - $3k", "$3k - $5k", ">$5k"];

export async function sendMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Fill in your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Keep the message under 5000 characters." };
  }

  try {
    await createMessage({
      name: name.slice(0, 120),
      email: email.slice(0, 200),
      budget: budgets.includes(budget) ? budget : null,
      message,
    });
    return { status: "success", message: "Thanks — your message landed. I'll reply soon." };
  } catch (error) {
    console.error("Contact form failed:", error);
    return {
      status: "error",
      message: "The message couldn't be saved. Try again, or email me directly.",
    };
  }
}

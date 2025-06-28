// api.ts

interface Lawyer {
  name: string;
  contact: string;
}

interface NGO {
  name: string;
  contact: string;
}

export interface ChatResponse {
  query: string;
  urgency?: string;
  bias?: string;
  legal_issue: string;
  advice?: string;
  lawyers?: Lawyer[];
  ngos?: NGO[];
}

export const sendChat = async (query: string): Promise<ChatResponse> => {
  try {
    const fd = new FormData();
    fd.append("query", query);

    const res = await fetch("http://localhost:8000/chat/", {
      method: "POST",
      body: fd
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return data as ChatResponse;
  } catch (error) {
    console.error("sendChat error:", error);
    throw error;
  }
};


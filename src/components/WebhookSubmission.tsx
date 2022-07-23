import { useState } from "react"

export const WebhookSubmission = () => {
  const [url, setUrl] = useState<string>("");

  return (
    <form>
      <label>
        URL
        <input type="text" onChange={e => setUrl(e.target.value)} />
      </label>
    </form>
  );
}

import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { trpc } from "../utils/trpc";
import { sanitizeUrl } from '@braintree/sanitize-url';
import { isValidUrl } from "../utils/isUrl";

export const WebhookSubmission : FC<{ className?: string; }> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [startValidating, setStartValidating] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const mutation = trpc.useMutation("webhook.add");

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidUrl(url)) {
      try {
        await mutation.mutateAsync({ url: sanitizeUrl(url) })
        setUrl("");
        setStartValidating(false);
      } catch {
        inputRef.current?.setCustomValidity('Input is invalid')
      }
    } else {
      console.error('url input is not valid')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (url) {
      setStartValidating(true);
    }
  }, [url]);

  useEffect(() => {
    if (!startValidating) return;
    const isValid = isValidUrl(url);
    inputRef.current?.setCustomValidity(isValid ? '' : 'Input is invalid')
  }, [startValidating, url]);

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 peer-invalid:text-red-500">
            URL
          </label>
          <input id="webhook-url" ref={inputRef} type="url" className="peer mt-0 w-full focus:ring-indigo-500 focus:border-indigo-500 flex-1 block rounded-none rounded-r-md sm:text-sm border-gray-300 invalid:border-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500" onChange={e => setUrl(e.target.value)} />
          <p className="invisible peer-invalid:visible peer-invalid:text-red-500 text-sm">The provided webhook url is not valid</p>
          <div className="px-4 py-3 text-right sm:px-6">
            <button type="submit" className="dark:text-white inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={!url || !isValidUrl(url)}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

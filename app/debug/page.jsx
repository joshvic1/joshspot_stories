export default function Debug() {
  return (
    <pre>
      {JSON.stringify(
        {
          BACKEND_URL: process.env.BACKEND_URL,
          NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        },
        null,
        2
      )}
    </pre>
  );
}

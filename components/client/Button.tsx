'use client';

export default function SubmitButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Button clicked!');
    // Add client-side logic if needed
  };

  return <button onClick={handleClick}>Submit</button>;
}

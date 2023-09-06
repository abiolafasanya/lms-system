export const metadata = {
  title: 'Kode Inspired Lms',
  description: 'Leaning Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export async function GET(request: Request) {
  return Response.json({
    status: 'up',
    success: true,
    service: 'frontend-web-app',
    timestamp: new Date().toISOString(),
  })
}

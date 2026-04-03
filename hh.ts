// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function proxy(request: NextRequest) {
//   const path = request.nextUrl.pathname;
  
//   const publicPages = ['/' , '/login', '/register' , '/verify-email'];
//   const publicAPIs = ['/api/login', '/api/register' , '/api/verify-email'];
  
//   if (publicPages.includes(path) || publicAPIs.includes(path)) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("token")?.value;

//   if (!token) {
//     if (path.startsWith('/api/')) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     const user = jwt.verify(token, "ronak") as { id: string; role: string; email: string };
    
//     const requestHeaders = new Headers(request.headers);
//     requestHeaders.set("x-user-id", user.id);
//     requestHeaders.set("x-user-role", user.role);
//     requestHeaders.set("x-user-email", user.email);

//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   } catch (error) {
//     if (path.startsWith('/api/')) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }


// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization)
//      * - favicon.ico (favicon)
//      * - public files (images, etc.)
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }
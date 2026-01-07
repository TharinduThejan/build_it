import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);

    if(!session) {
        redirect(302, "/login");
    }
    return (
        <div>
            <h1>Checkout Page</h1>
        </div>
    );
}
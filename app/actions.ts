"use server"

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user){
        return redirect("/api/auth/login");
    }
    const title = formData.get("title");
    const content = formData.get("content");
    const imageUrl = formData.get("imageUrl");

   await prisma.blogPost.create({
        data:{
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            authorId: user.id,
            authorName: user.given_name as string,
            authorImage: user.picture as string
        }
    })

    revalidatePath("/");
    
    return redirect("/dashboard");

}
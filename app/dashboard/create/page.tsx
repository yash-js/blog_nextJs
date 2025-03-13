import { handleSubmit } from "@/app/actions";
import { SubmitButton } from "@/components/general/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {

    return (
        <div>
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Create a post</CardTitle>
                    <CardDescription>
                        Create a new post to share with the world.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" action={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" type="text" required placeholder="Blog title" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea name="content" required placeholder="Blog content" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="imageUrl">Image Url</Label>
                            <Input name="imageUrl" required placeholder="https://example.com/image.jpg" type="text" />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
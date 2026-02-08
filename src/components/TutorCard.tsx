
import { Badge } from "@/components/ui/badge";
import Link from "next/link"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface TutorProps {
  tutor: {
    userId: string;
    bio: string;
    price: number;
    user: {
      name: string;
    };
    category: {
      name: string;
    };
  };
}

export default function TutorCard({ tutor }: TutorProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{tutor.user.name}</CardTitle>
 
          <Badge variant="secondary">{tutor.category.name}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{tutor.bio}</p>
        <div className="mt-4 font-semibold text-lg text-primary">
          ${tutor.price} <span className="text-sm font-normal text-muted-foreground">/ hour</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tutor/${tutor.userId}`}>Book a Session</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
import { getAllApprovedWebsites } from "@/data/websites";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { P } from "../ui/typography";
import { WebsiteLikeButton } from "./WebsiteLikeButton";
import { auth } from "@/auth";
import { WebsiteLink } from "./WebsiteLink";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteOverlay } from "./WebsiteOverlay";
export async function WebsiteList() {
  const session = await auth();
  const websites = await getAllApprovedWebsites();

  return (
    <div className="grid grid-cols-3 gap-6">
      {websites.map(({ id, name, url, imageUrl, user, likedBy, views }) => {
        const likedByAuth = likedBy.filter((like) => like.websiteId === id);

        return (
          <div key={id}>
            <AspectRatio ratio={8 / 6} className="relative bg-muted group ">
              <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-4 right-3  text-white z-20">
                <WebsiteLikeButton websiteId={id} likes={likedByAuth} userId={session?.user?.id} />
              </div>
              <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-5 left-4  text-white z-20">
                <P>
                  <span className="text-xs">WEBSITE</span>
                  <span className="block text-lg leading-tight">{name}</span>
                </P>
              </div>
              <WebsiteLink websiteId={id} websiteUrl={url}>
                <WebsiteOverlay />
                <Image src={imageUrl} alt="Preview" fill className="rounded-sm object-cover" />
              </WebsiteLink>
            </AspectRatio>
            <WebsiteFooter key={likedBy.length || views} author={user.name} avatar={user.image} views={views} likes={likedBy.length} />
          </div>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import {
  GitlabIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./icons";

export default function Footer() {
  return (
    <footer className="bg-white py-2 md:py-3">
      <div className="container flex items-center justify-between gap-2 md:gap-4">
        <div className="text-xs text-muted-foreground hover:text-foreground">
          © 2024 <i>Will the developer,</i> Inc. All rights reserved.
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <TwitterIcon className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <LinkedinIcon className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <GitlabIcon className="h-4 w-4" />
            <span className="sr-only">GitLab</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <YoutubeIcon className="h-4 w-4" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

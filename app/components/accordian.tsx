"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { JSX, SVGProps } from "react";

export default function Accordian() {
  return (
    <TooltipProvider>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-md space-y-2"
      >
        <div className="border rounded-md flex items-center justify-between">
          <div className="flex items-center p-3">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
            />
            <AccordionItem value="item-1" className="flex-grow">
              <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span>What is the purpose of this accordion?</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 text-sm text-muted-foreground">
                This accordion is designed to provide a clean and minimal way to
                display expandable content sections. Each section has a title
                that can be clicked to toggle the content open and closed.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="flex items-center gap-2 pr-4">
            <Tooltip>
              <TooltipTrigger>
                <FilePenIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Update</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <TrashIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="border rounded-md flex items-center justify-between">
          <div className="flex items-center p-3">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
            />
            <AccordionItem value="item-2" className="flex-grow">
              <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span>How do I use this accordion?</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 text-sm text-muted-foreground">
                To use this accordion, simply wrap the content you want to
                display in an `AccordionItem` component. The `value` prop should
                be unique for each item. The title of the section goes in the
                `AccordionTrigger` component, and the content goes in the
                `AccordionContent` component.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="flex items-center gap-2 pr-4">
            <Tooltip>
              <TooltipTrigger>
                <FilePenIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Update</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <TrashIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="border rounded-md flex items-center justify-between">
          <div className="flex items-center p-3">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
            />
            <AccordionItem value="item-3" className="flex-grow px-3">
              <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span>Can I customize the appearance?</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 text-sm text-muted-foreground">
                Lorem ipsum
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="flex items-center gap-2 pr-4">
            <Tooltip>
              <TooltipTrigger>
                <FilePenIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Update</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <TrashIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Accordion>
    </TooltipProvider>
  );
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

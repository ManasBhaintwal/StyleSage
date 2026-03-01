import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
}

export function PageContainer({
    children,
    className,
    as: Component = "div",
    ...props
}: PageContainerProps) {
    return (
        <Component
            className={cn(
                "container mx-auto px-4 md:px-6 max-w-7xl pt-24 pb-16 min-h-screen",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

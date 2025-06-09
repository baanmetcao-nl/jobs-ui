import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return {
    get: (key: string) => searchParams.get(key) ?? "",
    clear: () => {
      router.replace(pathname);
    },
    getOnChange: (key: string) => {
      return (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`);
      };
    },
    getOnDelete: (key: string) => {
      return () => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        router.replace(`${pathname}?${params.toString()}`);
      };
    },
  };
}

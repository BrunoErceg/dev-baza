function WebsiteDeleteItem({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async (websiteId: string) => {
    startTransition(async () => {
      const result = await deleteWebsite(websiteId);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };
  return <button onClick={() => deleteWebsite(websiteId)}>Delete</button>;
}

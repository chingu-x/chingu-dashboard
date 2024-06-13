export default function NoAgendasState() {
  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-base-100 p-5">
      <h4 className="py-2 text-xl font-medium">Contribute to the agenda!</h4>
      <p className="rounded-lg border-2 border-neutral/40 bg-base-200 px-[14px] py-[10px] text-base font-medium text-neutral-focus">
        To get started, click the Add Topic button to propose a new topic for
        discussion during the upcoming meeting. Your input will assist the team
        in planning for the meeting and ensuring that essential topics receive
        proper attention.
      </p>
    </div>
  );
}

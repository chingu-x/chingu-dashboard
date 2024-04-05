export default function NoAgendasState() {
  return (
    <div className="flex flex-col w-full p-5 rounded-lg bg-base-100 gap-y-4">
      <h4 className="py-2 text-xl font-medium">Contribute to the agenda!</h4>
      <p className="py-[10px] px-[14px] text-base font-medium text-neutral-focus bg-base-200 rounded-lg border-2 border-neutral/40 ">
        To get started, click the Add Topic button to propose a new topic for
        discussion during the upcoming meeting. Your input will assist the team
        in planning for the meeting and ensuring that essential topics receive
        proper attention.
      </p>
    </div>
  );
}

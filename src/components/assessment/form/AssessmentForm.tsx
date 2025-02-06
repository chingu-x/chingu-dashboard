import RadioGroupItem from "@/components/inputs/RadioGroup/RadioGroupItem";

export default function AssessmentForm() {
  return (
    <div className="absolute left-[583px] top-[318px] h-[580px] w-[812px] gap-[42px] p-20">
      <p className="mb-4">Do you have experience with HTML and CSS?</p>
      <div className="flex flex-col justify-center gap-4">
        <RadioGroupItem
          className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-4 pt-4"
          id="none"
          label={
            <div>
              <strong>No Experience</strong>
            </div>
          }
        />
        <RadioGroupItem
          className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-4 pt-4"
          id="beginner"
          label={
            <div>
              <strong>Beginner</strong>
              <p> I know what they are and have used them a bit</p>
            </div>
          }
        />
        <RadioGroupItem
          className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-4 pt-4"
          id="intermediate"
          label={
            <div>
              <strong>Intermediate</strong>
              <p> I can build projects with HTML and CSS</p>
            </div>
          }
        />
        <RadioGroupItem
          className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-4 pt-4"
          id="advanced"
          label={
            <div>
              <strong>Advanced</strong>
              <p>
                I can build responsive, accessible interfaces and have a good
                undestanding of modern layout techniques (Flexbox,Grid)
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

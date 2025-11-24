import { FollowerPointerCard } from "./ui/following-pointer";

export default function FollowingPointerDemo() {
  return (
    <div className="mx-auto w-120">
      <FollowerPointerCard
        title={
          <TitleComponent title={blogContent.author} avatar={blogContent.authorAvatar} />
        }>
       <div data-aos="fade-right" >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl" />
                    <div className="relative w-full aspect-[calc(4*3+1)/15] border-4 border-purple-500/50 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">


                      <div className="absolute inset-0 flex items-center justify-center text-9xl">

                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `
                           radial-gradient( rgba(221, 0, 255, 0.01), rgba(0, 38, 255, 0.1)),
                           url('../img/rb2.png')`,
                            backgroundSize: `cover`,
                            backgroundPosition: 'center'
                          }}
                        />


                      </div>

                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-pink-500/30" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/30" />
                  </div>
                </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Raja Behera",
  date: "12th March, 1991",
  title: "UX Engineer",
  description:
    "King",
  image: "../img/rb.png",
  authorAvatar: "../img/rb.png",
};

const TitleComponent = ({
  title,
  avatar
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="30"
      width="30"
      alt="RB"
      className="rounded-full border-2 border-white" />
    <p>{title}</p>
  </div>
);

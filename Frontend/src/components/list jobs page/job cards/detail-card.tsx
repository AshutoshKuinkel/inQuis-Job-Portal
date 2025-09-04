import { IoLocationOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { TbClockHour7 } from "react-icons/tb";
import { DollarSign } from "lucide-react";

const DetailCard = () => {
  return (
    <div className="tracking-widest">
      {/* Title + Location + Company + Job Type + salary + days posted ago */}
      <div>
        <div className="flex flex-col justify-center p-6 gap-1">
          <h1 className="text-4xl font-semibold text-[#2c3e50]">
            Senior Frontend Developer
          </h1>
          <p className="text-2xl text-[#6c7b7f]">TechCorp Inc.</p>
        </div>

        <div className="pl-6 flex flex-col gap-2 justify-center text-[#2c3e50]">
          {/* Location  */}
          <div className="flex items-center space-x-2">
            <IoLocationOutline size={18} />
            <p>San Fransisco, CA</p>
          </div>

          {/* Category */}
          <div className="flex items-center space-x-2">
            <BiCategoryAlt />
            <p>Technology</p>
          </div>

          {/* Job Type */}
          <div className="flex items-center space-x-2">
            <TbClockHour7 />
            <p>Full Time</p>
          </div>

          {/* Salary */}
          <div className="flex items-center space-x-2">
            <DollarSign size={18} />
            <p>$120k - $160k</p>
          </div>
        </div>
      </div>

      {/* Posted ago */}
      <div className="mt-6 pl-6 text-[#6c7b7f]">
        <p>Posted 2d ago</p>
      </div>

      {/* Apply + Build AI resume for Job button */}
      <div className="flex p-6 gap-2">
        <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
          Apply Now
        </button>

        <button className="border border-[#2c3e50] p-2 rounded-lg hover:bg-[#ECEEF2] hover:cursor-pointer">
          Generate AI Resume for Job
        </button>
      </div>

      {/* Job Description */}
      <div className="p-6">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nemo
          accusantium ut ullam non amet tempore molestiae, architecto sequi
          ratione atque quis laborum debitis nihil neque assumenda, porro quas,
          iure consequatur aliquid voluptate? Ipsam reiciendis temporibus vel!
          Expedita ducimus provident cumque odit repudiandae quasi officiis
          beatae repellendus, quis voluptas blanditiis sint obcaecati? Sit iusto
          blanditiis et est porro explicabo obcaecati adipisci, veniam nostrum
          quidem asperiores fugiat reprehenderit a expedita ad accusamus sint
          earum, vitae nulla quae perferendis! Quas porro architecto fuga
          voluptatum, quia sapiente impedit dolor nostrum asperiores quasi magni
          eum quos et delectus voluptas labore amet repudiandae. Quas sit
          necessitatibus illo amet qui? Architecto deleniti ipsam porro,
          molestias sint quo consectetur minima recusandae explicabo deserunt
          voluptatum. Dignissimos nam ducimus dolores, quod in aspernatur
          reprehenderit accusamus perferendis fugiat quis excepturi sint,
          deserunt officiis? Obcaecati omnis facere perspiciatis enim porro
          saepe sapiente quibusdam qui hic aliquam ut exercitationem maiores
          sequi cupiditate quo, labore consequuntur repudiandae distinctio illum
          sint quos voluptate, accusamus aut illo. Quidem quibusdam iste velit
          odit id, repellendus assumenda sed illo, rerum iusto minima molestiae
          laborum molestias soluta reiciendis nobis quam doloribus nisi
          praesentium libero sit harum autem? Eaque labore harum eveniet commodi
          repellat. Impedit alias est harum tenetur et enim soluta placeat. Eos
          eveniet in cum temporibus tempore ad doloremque quo possimus sunt.
          Minima quae ab suscipit? Voluptatibus deserunt, dolorem accusamus
          facere perferendis ipsam cumque voluptatem reprehenderit, est porro
          ipsum praesentium numquam aliquam, eum necessitatibus! Facilis ab,
          minima ipsum optio quia placeat, totam provident sapiente voluptatem a
          vel consectetur earum error mollitia consequuntur quis aliquam modi
          rerum animi nihil eveniet. Impedit quae velit autem illo, aut omnis
          maxime similique recusandae, exercitationem deserunt accusantium
          quaerat, iste modi tempore nihil hic corporis ex placeat et aperiam
          totam ducimus ipsa. Laboriosam, perferendis impedit aperiam odit dicta
          mollitia ratione officia natus, facilis fuga alias. Obcaecati, quod.
          Deleniti debitis sint dolorem officiis quo doloribus quibusdam, ipsam
          iste! Architecto rem dignissimos tempora, dolorum, est consequuntur
          soluta vitae dolor ea nobis nisi officiis quia expedita aperiam
          excepturi commodi id qui voluptatum iste dolore unde? Quibusdam, quia
          repudiandae itaque, eius dolores, aperiam voluptas hic reiciendis
          magnam delectus odit provident rem incidunt. Vitae ab unde sapiente
          labore, culpa maiores ipsam optio. Officiis hic modi totam eveniet
          doloribus corporis praesentium atque provident maxime. Blanditiis
          temporibus nobis, dicta modi doloremque totam nulla quaerat maiores!
          Deserunt, eveniet, officiis nisi, vel excepturi ipsam quasi explicabo
          maiores rem molestias temporibus fuga ullam error dolorum. Iste
          aliquid in quod neque ex provident placeat rem sed illum? Deleniti
          veniam magnam quos. Veritatis ipsa culpa sunt adipisci expedita
          voluptates aspernatur illum natus! Esse, debitis atque corporis iste
          soluta quo hic doloribus rerum ipsa harum id adipisci quas reiciendis
          facilis fugit blanditiis quod veritatis a deleniti ducimus iure
          distinctio, provident ea? Quaerat maxime aperiam quam officia, fugit
          eveniet ut delectus autem, recusandae, consectetur nihil fugiat
          impedit eum tempora! Iste consequuntur provident ipsa similique!
          Laboriosam nulla, sed nemo, tenetur doloribus, repellat vitae in ad
          reiciendis recusandae ab sint excepturi omnis tempore dolores libero
          ipsum illum impedit distinctio id. Dolore quasi veritatis magnam
          dolorum sequi animi quis. Pariatur praesentium temporibus, facere
          reprehenderit dolores ipsam tempore laboriosam adipisci sit minus
          accusamus unde ipsum. Vitae dolore molestias repudiandae, eaque totam
          aperiam beatae recusandae quibusdam. Odio excepturi aliquid
          accusantium esse maxime numquam voluptatibus optio, doloribus quasi,
          iusto ex officia dolorem et consequuntur ut eaque labore amet tempore.
          Amet inventore molestiae omnis. Ipsum totam praesentium, vitae quaerat
          explicabo doloribus molestiae necessitatibus magnam quo nesciunt
          aperiam ipsa. Possimus nostrum cumque tempora quisquam unde magni
          consequuntur a porro, ex exercitationem dolorum dignissimos voluptatum
          rerum esse doloribus libero aliquid harum enim! Inventore molestiae
          totam maiores.
        </p>
      </div>
    </div>
  );
};

export default DetailCard;

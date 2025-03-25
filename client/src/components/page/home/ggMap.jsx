import { motion } from "framer-motion";

const GoogleMapEmbed = () => {
  return (
    <div className="w-full flex items-center p-4 border rounded-lg shadow-md bg-color-custom-4 h-[450px]">
      <div className="w-1/4 text-center">
        <h1 className="text-2xl font-font1 font-bold">PETACILIOUS</h1>
        <h2 className="text-xl font-font2 font-base">Hãy đến với chúng tôi</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-3/4 h-full"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.28779028748!2d108.44162997587797!3d11.954565636357493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1742741342297!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default GoogleMapEmbed;

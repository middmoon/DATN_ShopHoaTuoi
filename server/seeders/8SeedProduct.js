"use strict";

const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const products = [
      {
        _id: 1,
        name: "Mẹ yêu - Mama Love",
        description:
          "Mother's Day đây là dịp để con cái tỏ lòng biết ơn công sinh thành, nuôi dưỡng của mẹ. Sản phẩm giỏ hoa này được thiết kế cho dịp đặc biệt này dùng để dành tặng cho những người mẹ đáng kính của bạn. Hãy bày tỏ lòng yêu thương và kính yêu đến người mẹ của mình bằng giỏ hoa này bạn nhé.",
        retail_price: 850000,
        status: "Còn hàng",
        slug: "me-yeu-mama-love",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 8,
            name: "Hoa Tặng Mẹ",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/16Y72dMKQfmIFm4gmEMusv2wptmpqoHSo/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1Nrya4v7ODrC4S0bmUv414KlbKMPBQdkx/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/16Y72dMKQfmIFm4gmEMusv2wptmpqoHSo/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 2,
        name: "Bó Hoa Hồng LyLy",
        description:
          "Hoa hồng mang vẻ đẹp nhẹ nhàng. Tượng trưng cho nét thanh tao, sang trọng của người phụ nữ. Bó hoa hồng LyLy sẽ là một món quà tuyệt vời dành cho người bạn thương mến.",
        retail_price: 800000,
        status: "Còn hàng",
        slug: "bo-hoa-hong-lyly",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 35,
            name: "Hoa Sinh Nhật",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 31,
            name: "Hoa Ly",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1eJsbIas3nkQ_m9mex09O5iHqFjEOuEG3/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/14fnLbhg7ut-BdcYT6kXAhgE2kT8ZtDhG/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/14fnLbhg7ut-BdcYT6kXAhgE2kT8ZtDhG/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 3,
        name: "Kệ hoa khai trương Successful",
        description:
          "Kệ hoa mừng khai trương mang trong mình nhiều ý nghĩa tốt lành và chúc phúc cho người nhận. Đây là một món quà tinh tế và ý nghĩa để gửi gắm những lời chúc may mắn, thành công và thịnh vượng vào dịp quan trọng này.",
        retail_price: 2500000,
        status: "Còn hàng",
        slug: "ke-hoa-khai-truong-successful",
        unit: "Lãng hoa",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 21,
            name: "Lãng Hoa Khai Trương",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1fzf80PhUlYRPCoUNfK0ovs0SoFvF2GNy/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1cowPPNLeqGHetNTOGuF3rjybQ06DL8LD/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1P1Shaq8GUyrFAAdn_fNrtMZ9dbcZN_pa/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19xmltrhir7wmTnFhWH3HJcFG8xxBHaT7/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 4,
        name: "Lãng hoa viếng sang trọng – Chia Buồn",
        description:
          "Vòng hoa viếng được tạo nên từ những loại hoa đẹp và chất lượng nhất, với sắc trắng của ánh sáng tối cao, sự thuần khiết của linh hồn sẽ giúp bạn mang tới sự chân thành và lòng kinh mến đối với người đã khuất. Hãy dành tặng Kệ hoa này như một món quà phân ưu tới gia quyến.",
        retail_price: 1000000,
        status: "Còn hàng",
        slug: "lang-hoa-vieng-sang-trong-chia-buon",
        unit: "Lãng hoa",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 38,
            name: "Hoa Chia Buồn",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1Ubr9p-XFTixvUBYe-P5T6jF2796Sh--X/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/15JCfaQ0IVjE8fqH1CRhVlM7CH8-fwkHF/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19ZjjrHKJh4P0Xw3qgUb-3UFgLyeG2obL/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1iDv0749P2ObRzbyhR2u8thykgo7GA1iI/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 5,
        name: "Bó Hoa Cưới Hồng Trắng Ngày Chung Đôi",
        description:
          "Hoa hồng được ví von như biểu tượng của sự tôn kính, lòng tin, niềm đam mê, sự ngưỡng mộ, và cả sự trường tồn, vĩnh cửu theo thời gian. Riêng hoa hồng trắng là biểu tượng của tình yêu trong sáng, thuần khiết của đôi lứa và tình bạn chân thành, không vụ lợi. Ngoài ra, hoa hồng trắng còn thể hiện niềm hy vọng vào một tương lai tươi sáng, hay một sự khởi đầu hanh thông, suôn sẻ cho quyết định quan trọng.",
        retail_price: 700000,
        status: "Còn hàng",
        slug: "bo-hoa-cuoi-hong-trang-ngay-chung-doi",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 16,
            name: "Bó Hoa Tươi",
          },
          {
            _id: 43,
            name: "Hoa Cưới",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1Lf6BzCZTvba-MrHcat8MFdWHegJhO94z/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1qESsGdtJ4BcR1esfgzlI9p3SReKWYzRk/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1KqL5nRCl0Qr7P6p1L-CaTxKufalKZ7Lc/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1HP3L6Qh2wMo-U7-uRfPw0bYBmY_d7XPZ/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 6,
        name: "Bó Hoa Tốt Nghiệp Chúc Thành Công",
        description:
          "Hoa hướng dương là đại diện cho những điều vui tươi. Vì vậy bạn nên tặng một Bó hoa Tốt Nghiệp Chúc Thành Công rực rỡ để tặng cho bạn bè hoặc người thân trong buổi lễ  tốt nghiệp đầy ý nghĩa đó.Hoa hướng dương không chỉ mang vẻ đẹp tinh tế rạng rỡ mà còn thay cho lời chúc của bạn tới người nhận về 1 tương lai tươi sáng.",
        retail_price: 450000,
        status: "Còn hàng",
        slug: "bo-hoa-tot-nghiep-chuc-thanh-cong",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 2,
            name: "Kiểu Dáng",
          },
          {
            _id: 16,
            name: "Bó Hoa Tươi",
          },
          {
            _id: 42,
            name: "Hoa Mừng Tốt Nghiệp",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/18fB5BvxNiStuXeP8jbqQcLgekKyeb1oc/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1aauH6QlWMYpJxdXftwplpjCUkyciCWtu/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/18JIMgRKqRorUtjS5Szj_BzevG37BJ5TZ/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1C-mNx3_aNZvXTfHBrNzkiVC71us5N2OL/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 7,
        name: "Giỏ Hoa Sinh nhật Sen đá – Món Quà Xinh Xinh",
        description:
          "Hoa sen đá đang trở nên phổ biến và là một món quà được nhiều cô nàng yêu thích. Không chỉ vì dáng vẻ mà cả màu sắc của nó. Giỏ hoa xanh mướt và đáng yêu này sẽ làm gục ngã bất cứ cô nàng nào bởi vì sự ngọt ngào vốn dĩ của nó.",
        retail_price: 500000,
        status: "Còn hàng",
        slug: "gio-hoa-sinh-nhat-sen-da-mon-qua-xinh-xinh",
        unit: "Giỏ hoa",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 6,
            name: "Bộ Sưu Tập",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 34,
            name: "Sen Đá",
          },
          {
            _id: 35,
            name: "Hoa Sinh Nhật",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1F81aE34i4zkoB7rUOodsBhRsrQfnS9ps/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1YkV3y-_p9i7uA9HS5UDwc0iUSSNhRJ9L/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1SECqxsmr32MTJwsgH2rIIX3lwl85XpKq/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/13uucZbGBqcGBLeeBxEyn3GP0c5tlLhZU/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 8,
        name: "Hộp Hoa Mica",
        description:
          "Dòng sản phẩm hoa tươi trong hộp miCa là sự hòa quyện giữa vẻ đẹp tự nhiên và phong cách hiện đại, mang lại sự cuốn hút và thanh nhã. Lớp mica trong suốt giúp tôn lên vẻ đẹp từng bông hoa, tạo cảm giác nhẹ nhàng và sang trọng. Đây không chỉ là món quà, mà còn là lời nhắn gửi yêu thương, thể hiện sự chăm chút tỉ mỉ trong từng chi tiết. Sản phẩm là lựa chọn hoàn hảo cho những dịp đặc biệt, mang đến niềm vui và xúc cảm cho người nhận, thể hiện sự trân trọng và ý nghĩa sâu sắc từ người tặng.",
        retail_price: 1500000,
        status: "Còn hàng",
        slug: "hop-hoa-mica",
        unit: "Hộp mika",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 2,
            name: "Kiểu Dáng",
          },
          {
            _id: 12,
            name: "Hoa Tặng Người Yêu",
          },
          {
            _id: 23,
            name: "Hộp Mica",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1hdWUeoMhNgoq2tUIsyBozCwV3Tp-0nv9/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1rfWW-VQ8eLkLQhQXZOOm-GcAPciJyIDR/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1bv-dlNNv7tTf3dzACOK_iS5hZ-Y0M9Y4/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1vsv1BaEXpV9oNjqssE_XDVWntWM84Yyr/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 9,
        name: "Fall in love – hoa hồng O’hara cao cấp",
        description:
          "Valentine này có nên tặng hoa hồng? Fall In Love là một gợi ý dành cho các bạn nam vào dịp Valentine sắp đến, nếu vẫn đang băn khoăn không biết lựa chọn mẫu hoa nào đốn tim nửa kia của mình thì đây là một trong những mẫu hoa hot nhất mà Nhà Hoa gợi ý đến bạn. Sử dụng 100% hoa hồng O’hara cao cấp và được ưa chuộng bật nhất khiến cho bó hoa trở nên sang trọng, hút mắt mà không kém phần bí ẩn. Kết hợp cùng với cẩm tú cầu – Loài hoa đặc trưng của Xứ sở Sương Mù gợi nên cảm giác đặc trưng khó tả.",
        retail_price: 1000000,
        status: "Còn hàng",
        slug: "fall-in-love-hoa-hong-o'hara-cao-cap",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 12,
            name: "Hoa Tặng Người Yêu",
          },
          {
            _id: 25,
            name: "Hoa Hồng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1YZIQMMzjGVKctDhyJ5pVbPFTzFQwgRVF/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1hJaDycIshGqQUMKsFbf6uvqFs4nCpwhQ/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1hJaDycIshGqQUMKsFbf6uvqFs4nCpwhQ/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/13cqHRr2zGHNt6lvngNkWS0vESdfgFkZ0/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 10,
        name: "Hộp Hoa Mẫu Đơn Xanh Mix Hồng Trắng Mừng Khai Trương",
        description:
          "Bó hoa mừng khai trương mang trong mình nhiều ý nghĩa tốt lành và chúc phúc cho người nhận. Đây là một món quà tinh tế và ý nghĩa để gửi gắm những lời chúc may mắn, thành công và thịnh vượng vào dịp quan trọng này.",
        retail_price: 1700000,
        status: "Còn hàng",
        slug: "hop-hoa-mau-don-xanh-mix-hong-trang-mung-khai-truong",
        unit: "Hộp",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 36,
            name: "Hoa Khai Trương",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1cDZX8djQS3S_6IG4Le9WXaMPEvb8N5xM/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/15lTjkNdkRP1jbMubS0SXgJ5y89FN2JAf/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1gJocLpk_xQdhdxPuF5IvNLYucWc691u1/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 11,
        name: "Bó Cẩm Tú Cầu Hồng Nhập",
        description:
          "Hoa cẩm tú cầu không chỉ là món quà tuyệt vời để thể hiện tình cảm sâu sắc mà còn mang thông điệp về sự dịu dàng và bền vững trong tình yêu. Đây là lựa chọn lý tưởng cho những dịp đặc biệt như ngày kỷ niệm, lễ tình nhân hay sinh nhật, giúp tạo nên một không gian ngọt ngào và ấm áp. Hoa cẩm tú cầu hồng không chỉ đẹp mắt mà còn là biểu tượng của sự mong ước về một tình yêu trọn vẹn và hạnh phúc..",
        retail_price: 700000,
        status: "Còn hàng",
        slug: "bo-cam-tu-cau-hong-nhap",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 12,
            name: "Hoa Tặng Người Yêu",
          },
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 40,
            name: "Hoa Tình Yêu",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1OSjKi--175oI2Ie6jAXRQQRYhzKjcbtR/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1de5N1PqcnIMdVWQiKiXvJt6a9rKeaNlI/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1OSjKi--175oI2Ie6jAXRQQRYhzKjcbtR/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 12,
        name: "Bó Hoa Angel",
        description:
          "Theo truyền thống, hoa hồng đỏ luôn tượng trưng cho tình yêu. Trong thực tế, Ngày lễ tình nhân sẽ không trọn vẹn nếu thiếu sắc thái cổ điển này. Ý nghĩa hoa hồng màu đỏ bao gồm niềm đam mê, năng lượng, lãng mạn bền bỉ và tình yêu bất diệt hoặc tình yêu đích thực. Trên toàn thế giới, hoa hồng màu đỏ đã được hiểu là Hoa hồng tình nhân. Các nhà thơ thường sử dụng ý nghĩa của nó để truyền tải sự lãng mạn và tình yêu trong những bài thơ của họ.",
        retail_price: 1000000,
        status: "Còn hàng",
        slug: "bo-hoa-angel",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 12,
            name: "Hoa Tặng Người Yêu",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 24,
            name: "Only Rose",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1VUpuFJZTiEdkTidREl4o2p2zAbeVKFth/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/18WJEdL7JAnuqaPe9Mx-aofDqNOX23E27/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19X5v6tcwNxBxECUzkzrlRkqHa_6301nV/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 13,
        name: "Bó Hoa Capuchino Mix",
        description:
          "Với vẻ đẹp kiêu sa và ý nghĩa sâu sắc, hoa hồng là món quà không thể thiếu trong dịp sinh nhật, thể hiện sự quan tâm, chúc mừng và hy vọng người nhận sẽ có một năm mới tràn đầy hạnh phúc và thành công. Bó hoa hồng không chỉ đẹp mắt mà còn là sự khẳng định của tình cảm chân thành, là điểm nhấn hoàn hảo cho ngày đặc biệt này.",
        retail_price: 800000,
        status: "Còn hàng",
        slug: "bo-hoa-capuchino-mix",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 25,
            name: "Hoa Hồng",
          },
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 35,
            name: "Hoa Sinh Nhật",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1MvrWCzSz-AffW8FMeRxh6HrSXbCEUCpv/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1wq9zSv_uyiFRVCa7QKUtuci2O4GTou3L/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1MvrWCzSz-AffW8FMeRxh6HrSXbCEUCpv/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 14,
        name: "Bó Hoa Mix Đa Dạng",
        description:
          "Mỗi bông hoa trong bó hoa không chỉ đẹp mà còn mang một thông điệp yêu thương đầy ý nghĩa. Hương thơm nhẹ nhàng lan tỏa, những cánh hoa mềm mại như lời nhắn nhủ rằng bạn luôn bên cạnh, yêu thương và nâng niu người vợ của mình. Bó hoa này không chỉ là một món quà, mà còn là cách bạn thể hiện sự tri ân, tình cảm và sự kính trọng đối với người vợ, người bạn đời luôn cùng bạn đi qua mọi thăng trầm.",
        retail_price: 700000,
        status: "Còn hàng",
        slug: "bo-hoa-mix-da-dang",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 10,
            name: "Hoa Tặng Vợ",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/18KvCimzSUT3u1Ai37bMH2neODEJoo6_M/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1ZTLZzLhZS2HdGXF0zCve37OsYqi_fPX6/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1mmvvkQZSZbaB4z8mn4HUIm8C2adrJWx0/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 15,
        name: "Bó Hoa Peony Tặng Sếp",
        description:
          "Bó hoa Peony tặng sếp là một cách tuyệt vời để bày tỏ sự tri ân trong các dịp như ngày kỷ niệm, lễ tết, hoặc đơn giản là một cử chỉ lịch sự để thể hiện lòng kính trọng đối với người lãnh đạo. Dù đơn giản hay cầu kỳ, bó hoa này sẽ giúp bạn gửi gắm những lời chúc tốt đẹp và thể hiện sự chuyên nghiệp trong mối quan hệ công sở.",
        retail_price: 1600000,
        status: "Còn hàng",
        slug: "bo-hoa-peony-tang-sep",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 15,
            name: "Hoa Tặng Sếp",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1qQIDQThSZG4rsGWZdSCe5IOVwHqXEFA6/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1l-kBOGjm7CRMvrSnOxrQbaXGuGXcQT9V/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1oKvcNCN6UdDm38xIMXN5YYlsmqnNTBaS/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 16,
        name: "Blue Ocean – Giỏ hoa cát tường cao cấp",
        description:
          "Blue Ocean - mẫu giỏ hoa tươi kết hợp giữa 3 loài hoa với 3 sắc thái cũng như ý nghĩa khác biệt nhưng khi hoà làm một loại hài hoà một cách trọn vẹn. Hoa hồng trắng là sự tôn vinh lòng trung thành trong tình bạn và tình yêu một cách vô hạn, để tạo nên sự khác biệt. Cúc mẫu đơn từng làm mưa làm gió chính là điểm nhấn không thể thiếu, được ví như đôi mắt của biển xanh. Với cát tường trắng tinh khiết, loài hoa này mang đến sự may mắn, một hành trình hanh thông thuận lợi. ",
        retail_price: 750000,
        status: "Còn hàng",
        slug: "blue-ocean-gio-hoa-cat-tuong-cao-cap",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 13,
            name: "Hoa Tặng Bạn Bè",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 30,
            name: "Hoa Cát Tường",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1ay3GbeoUPhdwVURZH7oMJ9cQVONT9Hta/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1AYC8vzBDgme_VoBwh3eskUFUGfFpajWi/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1PUkQW2czuwZhnEWnbEz0Bt-navlXW0jV/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1g-qd7nMlQeHg0kMiyxt3Pqu14a-ipp3I/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 17,
        name: "Bó Hoa Tulip Hồng 10 Bông",
        description:
          "Bó hoa Tulip hồng: Thể hiện sự ngọt ngào, tình yêu và lòng biết ơn. Đây là món quà tuyệt vời để thể hiện sự cảm kích và tình cảm dịu dàng.",
        retail_price: 900000,
        status: "Còn hàng",
        slug: "bo-hoa-tulip-hong-10-bong",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 41,
            name: "Hoa Cảm Ơn",
          },
          {
            _id: 5,
            name: "Màu Sắc",
          },
          {
            _id: 46,
            name: "Màu Hồng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/14qokRkuBclPGEbJMhhATXWp7s7GEeE_I/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1o6CJAEXFdKyxXVuEd4doPgcmI9MBRoCN/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19VLSFWTFi4a_pEzend4t_wcNjG2oM82Z/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 18,
        name: "Giỏ Hoa Chúc Mừng",
        description:
          "Giỏ hoa chúc mừng  không chỉ đẹp mắt mà còn mang đầy đủ ý nghĩa của sự chúc mừng, thành công và những lời chúc tốt lành. Bó hoa này chắc chắn sẽ khiến người nhận cảm thấy được tôn vinh và hạnh phúc.",
        retail_price: 600000,
        status: "Còn hàng",
        slug: "gio-hoa-chuc-mung",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 37,
            name: "Hoa Chúc Mừng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/16N0vMXQnzerQwTWrVPYnNq1qTxXNbaBJ/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1kGSaEn3_Y0ePjEI2zEyDgeNVWIwzSCIo/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1OQHCr6nvfIY3Nb49pz13NmbLN-I7nu-7/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 19,
        name: "Giỏ Hoa Cói Hàn Quốc Sunshine",
        description:
          "Từng bông hoa đều mang một thông điệp yêu thương và trân trọng, thể hiện sự biết ơn vô hạn đối với mẹ, người luôn là nguồn động viên và che chở trong cuộc sống. Bó hoa này chắc chắn sẽ khiến mẹ cảm nhận được tình cảm ấm áp, sự tôn trọng và tình yêu sâu sắc của con cái.",
        retail_price: 490000,
        status: "Còn hàng",
        slug: "gio-hoa-coi-han-quoc-sunshine",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 8,
            name: "Hoa Tặng Mẹ",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1khHb24imLBqoGbzN67Pa3a5KwXM-Npg3/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1e2cTvhG3a-Bl4kcKu4anAJYhfyPxPBnN/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1d8iJgmbsWgHWgGdOPbej7Lf_7MwC8WtB/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1zCOWN6-lMikmnLuA09Dr9uPAcie2LHy4/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 20,
        name: "Giỏ Hoa Hồng Mix Mừng Sinh Nhật",
        description:
          "Giỏ hoa hồng đỏ mừng sinh nhật được thiết kế để mang đến không khí vui tươi, phấn khởi và sự chúc mừng đặc biệt. Giỏ hoa này không chỉ đẹp mắt mà còn chứa đựng lời chúc tốt đẹp, sự yêu thương và niềm vui dành cho người nhận, chắc chắn sẽ làm cho buổi tiệc sinh nhật thêm phần ấm áp và ý nghĩa.",
        retail_price: 1200000,
        status: "Còn hàng",
        slug: "gio-hoa-hong-mix-mung-sinh-nhat",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 35,
            name: "Hoa Sinh Nhật",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 25,
            name: "Hoa Hồng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1guj-EJPf5RdR5EtIf4PDiDL9kv86oFEs/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/12_T3RzzKRAWDz8Jznn-u7MmYT7zSgksw/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1LO1RwG71dEnYK0fmytwF4EJe4Hp560JV/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 21,
        name: "Bó hoa cưới cầm tay tulip",
        description:
          "Bó hoa cưới cầm tay tulip mang đến một vẻ đẹp thanh thoát, tinh tế và đầy lãng mạn. Đây là lựa chọn phổ biến cho cô dâu muốn thể hiện sự đơn giản nhưng không kém phần sang trọng trong ngày trọng đại của mình.",
        retail_price: 1500000,
        status: "Còn hàng",
        slug: "bo-hoa-cuoi-cam-tay-tulip",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 43,
            name: "Hoa Cưới",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1SeBklqcz6EKSCPbqQXljoYi48pDL1FQF/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1SeKj1EJCBMOhsV6pPUmVwiLsz7my15lK/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1tDzR7jMjUQj_FwYiW1o36Ap29bGsGeEM/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 22,
        name: "Bó Hoa Cưới Hồ Điệp Dáng Dài",
        description:
          "Bó hoa gồm các loại hoa Lan hồ điệp, Hồng ohara, lan tiên, Tulip… với tông màu trắng chủ đạo… thích hợp để gửi tặng trong những dịp quan trọng như cưới hỏi.",
        retail_price: 1800000,
        status: "Còn hàng",
        slug: "bo-hoa-cuoi-ho-diep-dang-dai",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 43,
            name: "Hoa Cưới",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1EdIAwoNKGfBFxlRK2Uc4Wtz2rHisnjwf/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1kwnLTjyt9jQxnK5pMvE-u82BUlnZUyH7/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19Oy-_DFJDFvi5RTHOKrph5Jjs5YQFEi5/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 23,
        name: "Lãng Hoa Chia Buồn Tone Trắng",
        description:
          "Mỗi lãng hoa chia buồn không chỉ là món quà mang tính chất cảm thông, mà còn là một cách để bày tỏ lòng kính trọng và sự yêu mến đối với người đã qua đời.",
        retail_price: 2500000,
        status: "Còn hàng",
        slug: "ke-hoa-chia-buon-tone-trang",
        unit: "Kệ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 38,
            name: "Hoa Chia Buồn",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1cDZX8djQS3S_6IG4Le9WXaMPEvb8N5xM/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1xcdbwsc-asAzH3Qe03PXG9dXQypv6_7b/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1W4Hzlj1-DRyx1i5m_OX1YzVj0DWYmjJa/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 24,
        name: "Bình Hoa Tặng Sếp",
        description: "Bình hoa này sẽ là món quà lý tưởng để tặng sếp, thể hiện sự kính trọng và lời chúc tốt đẹp trong mối quan hệ công việc.",
        retail_price: 2500000,
        status: "Còn hàng",
        slug: "binh-hoa-tang-sep",
        unit: "Bình",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 38,
            name: "Hoa Chia Buồn",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1ZQwWDprmj3gDdAfmPZq4tVKXU8u7YM1h/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1N80rOOOaVuUtmvKE_g3jwXVpBmMM69N1/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1GA08lwQrT-kRvRd4evDtXc5heAMsZGVG/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 25,
        name: "Chậu Lan Hồ Điệp Đỏ",
        description: "Lan hồ điệp với sắc đỏ kiêu sa biểu tượng cho sự may mắn, phú quý, một năm tràn đầy rực rỡ.",
        retail_price: 2000000,
        status: "Còn hàng",
        slug: "chau-lan-ho-diep",
        unit: "Chậu",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 28,
            name: "Lan Hồ Điệp",
          },
          {
            _id: 5,
            name: "Màu Sắc",
          },
          {
            _id: 45,
            name: "Màu Đỏ",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1jx82FLL-fM4MDWMeaT5Ka-Qdc_z0qq76/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1vXDa3uF6pEYNeMgq99Gzwr9VibpHdlhz/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1Uj58socAWg28oO-ppMHHD3CJGyAjbhyy/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 26,
        name: "Chậu Lan Hồ Điệp Trắng",
        description:
          "Tết đến xuân về, không thể thiếu sắc hoa lan hồ điệp – biểu tượng của sự may mắn, tài lộc và thịnh vượng! Với vẻ đẹp kiêu sa và thanh lịch, lan hồ điệp không chỉ làm bừng sáng không gian mà còn mang đến nguồn năng lượng tích cực cho ngôi nhà của bạn.",
        retail_price: 1700000,
        status: "Còn hàng",
        slug: "hop-hoa-mau-don-xanh-mix-hong-trang-mung-khai-truong",
        unit: "Hộp",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 28,
            name: "Lan Hồ Điệp",
          },
          {
            _id: 5,
            name: "Màu Sắc",
          },
          {
            _id: 44,
            name: "Màu Trắng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/16E7b14QCCPkPYStxAJRRbpkfh_yK1Jid/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1KDr_-2KPpOb6ZXAok75LPJqS17gUXrXu/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1PEZiH_KQZGyeQhhX3J9Sp_uxI0JNEVzM/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 27,
        name: "Bó Hoa Cát Tường Tặng Mẹ",
        description:
          "Hoa cát tường là một món quà tuyệt vời để tặng mẹ, bởi hoa này không chỉ đẹp mà còn mang nhiều ý nghĩa sâu sắc. Với vẻ đẹp thanh thoát, nhẹ nhàng và tươi tắn, hoa cát tường thể hiện tình yêu thương, lòng kính trọng và sự biết ơn đối với người mẹ.",
        retail_price: 600000,
        status: "Còn hàng",
        slug: "bo-hoa-cat-tuong-tang-me",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 8,
            name: "Hoa Tặng Mẹ",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 30,
            name: "Hoa Cát Tường",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1cDZX8djQS3S_6IG4Le9WXaMPEvb8N5xM/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1tSwmH5wvdjTWWprZSRG84l47zm9FfSdV/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1u476qrL1RW-L9fqGV-r1SEYbg5dKa3zI/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1IzfToMlXPNrT7_3BxayypBdZ8fVOl4X9/view?usp=sharing",
            is_avatar: true,
          },
        ],
      },
      {
        _id: 28,
        name: "Giỏ Hoa Cẩm Chướng Tặng Mẹ",
        description:
          "Hoa cẩm chướng là một lựa chọn tuyệt vời để tặng mẹ, bởi hoa này không chỉ đẹp mà còn mang ý nghĩa sâu sắc, thể hiện sự kính trọng, tình yêu và lòng biết ơn. Trong nhiều nền văn hóa, hoa cẩm chướng tượng trưng cho tình mẫu tử và sự hy sinh của mẹ.",
        retail_price: 500000,
        status: "Còn hàng",
        slug: "gio-hoa-cam-chuong-tang-me",
        unit: "Giỏ",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 8,
            name: "Hoa Tặng Mẹ",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 29,
            name: "Cẩm Chướng",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1eQ-AJh0eA9t20MO-OL1m78MwmoCA3w64/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1OdDJx3AVKOmeoeMYrL_CsUGi8bbf1rx8/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1YvvgqwhXtwi780chFSBOO6B2H4dHnA60/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/167g-Q4vzhFJRxOKSo7ZbX5_HN0QnVL1G/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 29,
        name: "Bó Hoa Baby Trắng",
        description:
          "Hoa Baby Flower (hay còn gọi là hoa baby, hoa dơn hay hoa baby breath) là một loại hoa nhỏ nhắn, mỏng manh, thường được sử dụng trong các bó hoa như một loại hoa phụ đi kèm, nhưng cũng có thể tạo thành bó hoa riêng biệt. Dù nhỏ bé, hoa baby mang trong mình nhiều ý nghĩa sâu sắc và được yêu thích trong nhiều dịp đặc biệt. Hoa baby flower là món quà tuyệt vời để thể hiện tình cảm yêu thương, đặc biệt khi bạn muốn gửi gắm thông điệp nhẹ nhàng, ngọt ngào đến người nhận.",
        retail_price: 400000,
        status: "Còn hàng",
        slug: "bo-hoa-baby-trang",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 13,
            name: "Hoa Tặng Bạn Bè",
          },
          {
            _id: 3,
            name: "Hoa Tươi",
          },
          {
            _id: 32,
            name: "Baby Flower",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1F9Kp4G9dZXTQe2ugvV12my2tVIh_9KTi/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1Dc4tW7GVQQenUMSz5-KNkCZ38MjxGN2O/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1TmjQbskLW-5TpSKJKR2omPuIyqwWEt_9/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/12EbJaXEYC94YbNqUxj2BNdhEP62Ha-yd/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 30,
        name: "Hộp Mica Nến và Hoa",
        description:
          "Nến và hoa - món quà dành tặng nàng với hương thơm ngọt ngào của nến và sự dịu dàng của hoa tạo nên một set quà thư giãn dễ chịu dù không nhân dịp gì cả.",
        retail_price: 1200000,
        status: "Còn hàng",
        slug: "hop-hoa-mau-don-xanh-mix-hong-trang-mung-khai-truong",
        unit: "Hộp",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 12,
            name: "Hoa Tặng Người Yêu",
          },
          {
            _id: 2,
            name: "Kiểu Dáng",
          },
          {
            _id: 23,
            name: "Hộp Mika",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1JynBvB5DXTDIwGVwPIrszKT9VgXKjhIe/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/106ZUbYpqKfPDS7w2IZGu6lvmfuTcVzV8/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1wFP7MRlZ9tp51H9yPeG2i3z6S1GnozRP/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1MIj3Id7jsx1vgU5KZOpGL8AWR7QFiziS/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 31,
        name: "Bó Hoa Mix Tặng Tốt Nghiệp",
        description:
          "Tặng hoa trong dịp tốt nghiệp không chỉ là một món quà đẹp mà còn thể hiện sự quan tâm, động viên và mong muốn người nhận sẽ có một tương lai tươi sáng, thành công.",
        retail_price: 800000,
        status: "Còn hàng",
        slug: "bo-hoa-mix-tang-tot-nghiep",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 43,
            name: "Hoa Mừng Tốt Nghiệp",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1Uytm6-3soip87XDQxVSF0qX6MS1ZtSz4/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1gg-kEoBY21OqNatRJYDnot3ZtoOxZfJz/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1ePNqN_DXKyZ2irFc4D6iLQi-AweZjYcF/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 32,
        name: "Hoa Tặng Đồng Nghiệp - Khởi Đầu Mới",
        description:
          "Tặng hoa cho đồng nghiệp là một cách tuyệt vời để thể hiện sự quan tâm, tình cảm thân thiện và tạo dựng mối quan hệ tốt đẹp trong môi trường làm việc. Món quà này không chỉ giúp tăng cường sự gắn kết giữa các đồng nghiệp mà còn tạo ra bầu không khí tích cực và thân thiện trong công ty. ",
        retail_price: 700000,
        status: "Còn hàng",
        slug: "hoa-tang-dong-nghiep-khoi-dau-moi",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 14,
            name: "Hoa Tặng Đồng Nghiệp",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1pE-8pyH2z0Osb6jqfsDIxFH1jxY2YlqB/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1phhJlFWnysFaHRj_r110mfu8ZVQWE3q-/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1NnFj6sUTMXtewZShCeNt2fOChqOlgmVn/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 33,
        name: "Bó Hoa Hồng Tặng Vợ",
        description:
          "Bó hoa hồng tặng vợ có thể được gửi tặng trong những dịp đặc biệt như sinh nhật, kỷ niệm ngày cưới, ngày Valentine, hoặc bất kỳ ngày nào bạn muốn thể hiện tình cảm và sự quan tâm dành cho vợ. Bó hoa cũng có thể là món quà bất ngờ trong một ngày bình thường, giúp tình yêu của hai bạn thêm phần ngọt ngào và lãng mạn.",
        retail_price: 1300000,
        status: "Còn hàng",
        slug: "bo-hoa-hong-tang-vo",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 1,
            name: "Đối Tượng",
          },
          {
            _id: 10,
            name: "Hoa Tặng Vợ",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1c0rFyEVCvWsDb4_UcSii9fpKW0G43_FU/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1TJiwVXMPEoigm3fk920TXHYzg9FJeXUY/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1zYpw8JqN1QOUqcqRgftrcB6bPiWoSVz7/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1-jHl4zZUrAqMspbpYIWDCEUpCXNNjdu1/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 34,
        name: "Bó Hoa Mừng Khai Trương",
        description:
          "Bó hoa mừng khai trương mang trong mình nhiều ý nghĩa tốt lành và chúc phúc cho người nhận. Đây là một món quà tinh tế và ý nghĩa để gửi gắm những lời chúc may mắn, thành công và thịnh vượng vào dịp quan trọng này.",
        retail_price: 600000,
        status: "Còn hàng",
        slug: "bo-hoa-mung-khai-truong",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 36,
            name: "Hoa Khai Trương",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1OcfZpJnKYExmiDvJ10VwDAs8rjs43GQk/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1XRksHWXbGkaCyx9sVr6Y-RfXOj_SpfkW/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/113QnhrmUbrzv67GvgCIhhauOdjluqMat/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/10SbYN069TlPFSo5daIJ6614WK9yWcM1T/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 35,
        name: "Bó Hoa Mix Chúc Sức Khỏe",
        description:
          "Hoa chúc sức khỏe là món quà đầy ý nghĩa dành tặng cho người thân, bạn bè, hoặc đồng nghiệp trong những dịp họ đang gặp khó khăn về sức khỏe hoặc đơn giản là bạn muốn gửi lời chúc sức khỏe, bình an đến họ. Những bó hoa này thường mang thông điệp tích cực, hy vọng người nhận nhanh chóng phục hồi và có một cuộc sống khỏe mạnh, vui vẻ.",
        retail_price: 750000,
        status: "Còn hàng",
        slug: "bo-hoa-mix-chuc-suc-khoe",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 39,
            name: "Hoa Chúc Sức Khỏe",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1gbAX66gMTJfSEje9Vz2C6PIYO-MZZQP-/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1bsdNhG736d60GDE_1iOxnIwN5N9dkGzt/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1iByGvJORYB3yOZPOdBCxTFnxS0J3UTBQ/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1Kiil8M85FpeQ-Cc9CdoGwmySaeOmxYr6/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 36,
        name: "Bó Hoa Tulip Mừng Tốt Nghiệp",
        description:
          "Chúc mừng bạn đã hoàn thành một chặng đường quan trọng! Bạn đang muốn tìm một cách thể hiện cảm xúc qua hoa tulip để mừng tốt nghiệp phải không? Hoa tulip là biểu tượng của sự tươi mới và thành công, rất phù hợp để gửi gắm lời chúc mừng.",
        retail_price: 700000,
        status: "Còn hàng",
        slug: "bo-hoa-tulip-mung-tot-nghiep",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 42,
            name: "Hoa Mừng Tốt Nghiệp",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1xvRHwAbUSmKtMCovwxAAmHbE2zEZ1ceL/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1xvRHwAbUSmKtMCovwxAAmHbE2zEZ1ceL/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1FAQNInVN_Mbg5L1GDlT5txT7eYlSRe5B/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/15pokWYdwu5KLL_3XME2dMmCB-O3N4xhE/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 37,
        name: "Bó Hoa Cưới Pastel",
        description:
          "Một bó hoa cưới thường mang ý nghĩa đặc biệt và là một phần quan trọng trong ngày trọng đại của cô dâu. Bó hoa cưới không chỉ là món phụ kiện tuyệt vời mà còn thể hiện phong cách và cá tính của cô dâu.",
        retail_price: 1300000,
        status: "Còn hàng",
        slug: "bo-hoa-cuoi-pastel",
        unit: "Bó",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 4,
            name: "Chủ Đề",
          },
          {
            _id: 43,
            name: "Hoa Cưới",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1gRap1XsTreqrcPtAbkrusTDRwH0YU9l3/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1gRap1XsTreqrcPtAbkrusTDRwH0YU9l3/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1_Xeq78GSxZZpijY1qaiwcgMPqaLqWyhA/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 38,
        name: "Bình Tưới Hoa Dạng Phun Gardening",
        description:
          "* Những điều bạn cần biết về bình tưới cây:\n- Lưu lượng nước quá nhiều có thể dẫn đến mất độ phì nhiêu của đất và thậm chí làm hỏng gân lá của cây. Dòng nước mềm và nhẹ có lợi hơn cho việc hấp thụ độ ẩm của đất.\n- Nâng cấp đầu vòi sen bằng thép không gỉ tạo sự bền bỉ cho bình tưới\n- Đầu vòi tưới có thể tháo rời nên có thể chuyển đổi lưu lượng nước để đáp ứng nhu cầu làm vườn hằng ngày\n- Nguyên liệu chất lượng cao: làm bằng nhựa HIPS, khoẻ và bền\n- Dung tích: 1,8L có thể tưới được nhiều hoa cùng lúc\n- Trọng lượng: 280grm\n- Kích thước: đường kính đáy 13cm, cao 24cm.",
        retail_price: 220000,
        status: "Còn hàng",
        slug: "binh-tuoi-hoa-dang-phun-gardening",
        unit: "Bình",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 7,
            name: "Chăm Sóc Hoa",
          },
          {
            _id: 58,
            name: "Phụ Kiện Dưỡng Hoa",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1vMFaqbXzM0d1Z7Nidek0sIzMXzGZqH56/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1vMFaqbXzM0d1Z7Nidek0sIzMXzGZqH56/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1jxIWa9pRzWfqTrOiQ7cFnVh1SiheR1tV/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 39,
        name: "Set 30 GÓI Bột Dưỡng Hoa Tươi Lâu, Hiệu Longlife Israel",
        description:
          "Bột Dinh Dưỡng Giữ Hoa Hồng Lâu Tàn cắm hoa tại Shop Hoa là dạng bột màu trắng, không mùi, không độc hại và được gọi là “chế phẩm cho Food For Cut Flowers. Là bí quyết tuyệt vời giữ hoa hồng luôn tươi mới, cánh hoa hồng cứng cáp gấp 2 lần và trong 14 ngày không thay gốc hay cắt tỉa gốc hoa. Giúp Hạn chế thay hoa định kỳ, hoa cắm xốp, cắm lẵng.",
        retail_price: 100000,
        status: "Còn hàng",
        slug: "set-30-goi-bot-duong-hoa-tuoi-lau-hieu-longlife-israel",
        unit: "Hộp",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 7,
            name: "Chăm Sóc Hoa",
          },
          {
            _id: 56,
            name: "Dưỡng Hoa Tươi",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/1IRsFI6NQ7edOVK7eQwZ8F4SgzV65UxjS/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1bOgLBJU6ozZhL0Q6RGeCzK0hIB1U00Mz/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/19iaqu96gag0dOzqYbaI36Nhd424l7uWv/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
      {
        _id: 40,
        name: "Kéo Cắt Hoa, Tỉa Cành Mũi Bầu",
        description:
          "Đặc điểm sản phẩm:\n\nChiều dài sản phẩm: 16,5cm\nKích thước lưỡi dao: dài 6,5cm và dầy 4mm\nChiều rộng sản phẩm: 10cm\nChất liệu: lưỡi dao bằng thép không gì, cán dao bằng nhựa PP\nTính năng sản phẩm:\n\nLưỡi dao bằng thép không gỉ, thời gian sử dụng lâu dài. Cách cạnh được làm mịn tránh bị đau khi sử dụng\nLực cắt mạnh, dễ dàng khi tỉa hoa\nTay cầm thiết kế chống va cham và giảm sóc để sử dụng lâu không bị mỏi.\nMục đích sử dụng:\n\nSử dụng để cắt hoa, tỉa hoa, cắt tỉa hoa hồng",
        retail_price: 40000,
        status: "Còn hàng",
        slug: "keo-cat-hoa-tia-canh-mui-bau",
        unit: "Cái",
        is_feature: true,
        is_public: true,
        categories: [
          {
            _id: 7,
            name: "Chăm Sóc Hoa",
          },
          {
            _id: 58,
            name: "Phụ Kiện Dưỡng Hoa",
          },
        ],
        images: [
          {
            img_url: "https://drive.google.com/file/d/11-xgyF3lPAZ2V_-z2QbbhRpKXd4K2gM8/view?usp=sharing",
            is_avatar: true,
          },
          {
            img_url: "https://drive.google.com/file/d/1cjSfhbigCboZM0A1eFh5zDS_BV1657cg/view?usp=sharing",
            is_avatar: false,
          },
          {
            img_url: "https://drive.google.com/file/d/1cjSfhbigCboZM0A1eFh5zDS_BV1657cg/view?usp=sharing",
            is_avatar: false,
          },
        ],
      },
    ];

    for (const product of products) {
      const { categories, images, ...productInfo } = product;

      productInfo.slug = slugify(productInfo.name + "-" + product._id, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      });

      productInfo.createdAt = new Date();
      productInfo.updatedAt = new Date();

      await queryInterface.bulkInsert("products", [productInfo]);

      const imagesData = images.map((image) => ({
        product_id: product._id,
        ...image,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("product_images", imagesData);

      const categoryMappings = categories.map((category) => ({
        product_id: product._id,
        product_category_id: category._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("product_ctgr_mapping", categoryMappings);
    }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("material_attributes", null, {});
  },
};

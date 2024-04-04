import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:px-16 px-4 py-10 bg-[#212121] w-full bottom-0">
      <div className="mb-10 flex">
        <svg
          width="600"
          height="760"
          viewBox="0 0 600 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-auto md:border border-[0.5px] rounded border-white"
        >
          <g filter="url(#filter0_d_4_10)">
            <rect x="4" width="592" height="752" rx="84" fill="#231E1F"></rect>
            <rect
              x="68"
              y="223"
              width="464"
              height="464"
              rx="24"
              fill="white"
              stroke="#277BC0"
              strokeWidth="48"
            ></rect>
            <path
              d="M227.52 46.32V65.2L196.32 64.72V158H173.44V64.72L142.88 65.2V46.32H227.52Z"
              fill="white"
            ></path>
            <path
              d="M243.909 158V46.32H276.229C291.269 46.32 302.629 48.4533 310.309 52.72C318.095 56.9867 321.989 64.6133 321.989 75.6C321.989 82.8533 319.962 88.72 315.909 93.2C311.855 97.5733 306.095 100.507 298.629 102V102.32C302.362 103.28 305.189 104.88 307.109 107.12C309.029 109.253 310.949 112.613 312.869 117.2L330.149 158H305.349L292.869 126.32C290.415 120.133 288.015 116.133 285.669 114.32C283.429 112.507 279.002 111.6 272.389 111.6H266.469V158H243.909ZM266.469 63.92V94.32H273.029C281.989 94.32 288.495 93.0933 292.549 90.64C296.709 88.1867 298.789 84.1867 298.789 78.64C298.789 72.88 296.709 68.9867 292.549 66.96C288.389 64.9333 281.882 63.92 273.029 63.92H266.469Z"
              fill="white"
            ></path>
            <path
              d="M416.24 93.2V46.32H436.56V158H408.08L379.44 103.28C373.147 91.3333 367.76 79.8667 363.28 68.88H362.96C363.493 76.56 363.76 88.88 363.76 105.84V158H343.44V46.32H373.52L401.68 101.52C406.267 110.373 411.333 121.253 416.88 134.16H417.2C416.56 123.28 416.24 109.627 416.24 93.2Z"
              fill="white"
            ></path>
            <path
              d="M223.126 413.8V302.12H245.686V394.6H289.046V413.8H223.126Z"
              fill="black"
            ></path>
            <path
              d="M380.469 391.88L381.269 411.24C374.123 413.693 365.429 414.92 355.189 414.92C336.949 414.92 322.283 409.853 311.189 399.72C300.096 389.587 294.549 375.667 294.549 357.96C294.549 340.893 300.096 327.133 311.189 316.68C322.389 306.227 336.576 301 353.749 301C364.096 301 373.109 302.333 380.789 305L379.189 324.36C371.723 320.947 363.829 319.24 355.509 319.24C344.203 319.24 335.189 322.547 328.469 329.16C321.856 335.773 318.549 345.16 318.549 357.32C318.549 369.373 322.069 378.867 329.109 385.8C336.149 392.733 345.056 396.2 355.829 396.2C364.683 396.2 372.896 394.76 380.469 391.88Z"
              fill="black"
            ></path>
            <path
              d="M227.88 435.4C267.72 435.4 287.64 464.12 287.64 521.56C287.64 579.64 267.32 608.68 226.68 608.68C185.56 608.68 165 580.28 165 523.48C165 493.56 170.12 471.4 180.36 457C190.6 442.6 206.44 435.4 227.88 435.4ZM254.04 522.28C254.04 480.84 244.84 460.12 226.44 460.12C208.04 460.12 198.84 480.28 198.84 520.6C198.84 562.84 208.12 583.96 226.68 583.96C235.48 583.96 242.2 578.76 246.84 568.36C251.64 557.8 254.04 542.44 254.04 522.28Z"
              fill="black"
            ></path>
            <path
              d="M412.369 438.28V546.04H435.169V571.48H412.369V605.8H380.449V571.48H302.929V544.6L371.569 438.28H412.369ZM381.169 546.04V517.72C381.169 497.88 381.489 479.64 382.129 463H381.649C375.249 475.64 367.329 489.4 357.889 504.28L331.969 546.04H381.169Z"
              fill="black"
            ></path>
          </g>
          <defs>
            <filter
              id="filter0_d_4_10"
              x="0"
              y="0"
              width="600"
              height="760"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_4_10"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_4_10"
                result="shape"
              ></feBlend>
            </filter>
          </defs>
        </svg>
        <div className="ml-2 flex flex-col justify-center">
          <p className="text-white font-bold md:text-xs text-[0.5rem] md:whitespace-normal whitespace-pre-wrap m-0">
            {`日本全国の鉄道路線で使える\n新感覚ナビゲーションアプリ`}
          </p>
          <p className="md:text-2xl text-base text-white font-bold md:mt-1 leading-none mt-0">
            TrainLCD
          </p>
        </div>
      </div>
      <div className="bg-[#afafaf] h-[1px]"></div>
      <div className="md:flex-row flex-col pt-6 flex justify-between">
        <div className="flex gap-3 mt-5 md:flex-row flex-col">
          <Link
            href="https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
            className="md:opacity-75 font-bold text-white text-xs transitionOpacity hover:opacity-100 h-min"
          >
            開発者のポートフォリオ
          </Link>
          <Link
            href="https://trainlcd.app/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="md:opacity-75 font-bold text-white text-xs transitionOpacity hover:opacity-100 h-min"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="https://trainlcd.app/privacy-policy-en"
            target="_blank"
            rel="noopener noreferrer"
            className="md:opacity-75 font-bold text-white text-xs transitionOpacity hover:opacity-100 h-min"
          >
            Privacy Policy(English)
          </Link>
        </div>
        <div className="md:mt-0 mt-8 md:items-end flex flex-col justify-center">
          <Link
            href="https://tinykitten.me"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg
              width="193"
              height="33"
              viewBox="0 0 193 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 32.6274C24.8366 32.6274 32 25.3235 32 16.3137C32 7.3039 24.8366 0 16 0C7.16344 0 0 7.3039 0 16.3137C0 25.3235 7.16344 32.6274 16 32.6274Z"
                fill="white"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.90411 16.8108L5.2165 24.3565L4.54602 24.0147L11.8603 9.04752L12.1854 8.38979L12.2768 8.15674L12.3784 8.38979L12.6984 9.04752L12.2819 9.90205L9.29523 16.0132H15.2686L12.2819 9.90205L12.6984 9.04752L15.939 15.6662L15.7663 16.0132L15.939 15.6662L19.1746 9.04752L19.5962 9.90205L16.6044 16.0132H22.5828L19.5962 9.90205L19.1746 9.04752L19.4946 8.38979L19.5962 8.16192L19.6927 8.38979L27.332 24.0147L26.6616 24.3565L22.9689 16.8108H16.4978L20.0178 24.0147L19.3473 24.3565L15.939 17.3805L12.5257 24.3565L11.8552 24.0147L15.3803 16.8108H8.90411Z"
                fill="#333333"
              ></path>
              <path
                d="M45.056 10.6398H45.76L50.56 21.9998H49.696L48.112 18.2558H42.688L41.104 21.9998H40.224L45.056 10.6398ZM47.888 17.5838L45.408 11.6318L42.88 17.5838H47.888Z"
                fill="white"
              ></path>
              <path
                d="M64.0222 12.2238H60.2462V21.9998H58.4382V12.2238H54.6462V10.6398H64.0222V12.2238Z"
                fill="white"
              ></path>
              <path
                d="M65.3216 21.9998V13.6318H67.0816V21.9998H65.3216ZM65.3216 12.2558V10.3198H67.0816V12.2558H65.3216Z"
                fill="white"
              ></path>
              <path
                d="M76.7006 21.9998H74.9406V17.3118C74.9406 16.5225 74.8126 15.9518 74.5566 15.5998C74.3113 15.2372 73.9433 15.0558 73.4526 15.0558C73.1966 15.0558 72.9406 15.1038 72.6846 15.1998C72.4286 15.2958 72.1886 15.4345 71.9646 15.6158C71.7406 15.7865 71.538 15.9945 71.3566 16.2398C71.186 16.4745 71.0526 16.7358 70.9566 17.0238V21.9998H69.1966V13.6318H70.7966V15.3118C71.1166 14.7465 71.5806 14.3038 72.1886 13.9838C72.7966 13.6532 73.4686 13.4878 74.2046 13.4878C74.706 13.4878 75.1166 13.5785 75.4366 13.7598C75.7566 13.9412 76.0073 14.1918 76.1886 14.5118C76.3806 14.8212 76.514 15.1838 76.5886 15.5998C76.6633 16.0052 76.7006 16.4372 76.7006 16.8958V21.9998Z"
                fill="white"
              ></path>
              <path
                d="M78.844 23.9678C79.004 23.9998 79.1587 24.0265 79.308 24.0478C79.468 24.0692 79.596 24.0798 79.692 24.0798C79.8307 24.0798 79.948 24.0478 80.044 23.9838C80.1507 23.9305 80.2573 23.8292 80.364 23.6798C80.4707 23.5305 80.5773 23.3172 80.684 23.0398C80.8013 22.7732 80.9347 22.4265 81.084 21.9998L77.644 13.6318H79.452L82.044 20.4478L84.348 13.6318H86.012L82.22 23.9358C82.0493 24.4158 81.7507 24.8158 81.324 25.1358C80.908 25.4665 80.3693 25.6318 79.708 25.6318C79.58 25.6318 79.4467 25.6212 79.308 25.5998C79.1693 25.5892 79.0147 25.5572 78.844 25.5038V23.9678Z"
                fill="white"
              ></path>
              <path
                d="M87.53 21.9998V10.6558H89.322V16.4958L94.666 10.6398H96.65L92.17 15.6638L96.906 21.9998H94.906L91.066 16.7678L89.322 18.5758V21.9998H87.53Z"
                fill="white"
              ></path>
              <path
                d="M97.8685 21.9998V13.6318H99.6285V21.9998H97.8685ZM97.8685 12.2558V10.3198H99.6285V12.2558H97.8685Z"
                fill="white"
              ></path>
              <path
                d="M106.399 21.5678C106.175 21.6745 105.866 21.7972 105.471 21.9358C105.077 22.0638 104.655 22.1278 104.207 22.1278C103.93 22.1278 103.669 22.0905 103.424 22.0158C103.178 21.9412 102.96 21.8292 102.768 21.6798C102.586 21.5305 102.442 21.3385 102.335 21.1038C102.229 20.8585 102.175 20.5652 102.175 20.2238V14.9918H101.071V13.6318H102.175V10.8798H103.936V13.6318H105.759V14.9918H103.936V19.6638C103.957 19.9625 104.047 20.1812 104.207 20.3198C104.378 20.4478 104.586 20.5118 104.831 20.5118C105.077 20.5118 105.311 20.4692 105.535 20.3838C105.759 20.2985 105.925 20.2292 106.032 20.1758L106.399 21.5678Z"
                fill="white"
              ></path>
              <path
                d="M112.274 21.5678C112.05 21.6745 111.741 21.7972 111.346 21.9358C110.952 22.0638 110.53 22.1278 110.082 22.1278C109.805 22.1278 109.544 22.0905 109.299 22.0158C109.053 21.9412 108.835 21.8292 108.643 21.6798C108.461 21.5305 108.317 21.3385 108.211 21.1038C108.104 20.8585 108.05 20.5652 108.05 20.2238V14.9918H106.947V13.6318H108.05V10.8798H109.811V13.6318H111.634V14.9918H109.811V19.6638C109.832 19.9625 109.922 20.1812 110.082 20.3198C110.253 20.4478 110.461 20.5118 110.706 20.5118C110.952 20.5118 111.186 20.4692 111.41 20.3838C111.634 20.2985 111.8 20.2292 111.907 20.1758L112.274 21.5678Z"
                fill="white"
              ></path>
              <path
                d="M117.082 22.1598C116.432 22.1598 115.84 22.0478 115.306 21.8238C114.773 21.5892 114.314 21.2745 113.93 20.8798C113.557 20.4852 113.264 20.0265 113.05 19.5038C112.848 18.9812 112.746 18.4265 112.746 17.8398C112.746 17.2532 112.848 16.6985 113.05 16.1758C113.264 15.6425 113.557 15.1785 113.93 14.7838C114.314 14.3785 114.773 14.0638 115.306 13.8398C115.84 13.6052 116.437 13.4878 117.098 13.4878C117.749 13.4878 118.336 13.6052 118.858 13.8398C119.392 14.0745 119.845 14.3892 120.218 14.7838C120.592 15.1678 120.874 15.6212 121.066 16.1438C121.269 16.6558 121.37 17.1945 121.37 17.7598C121.37 17.8878 121.365 18.0105 121.354 18.1278C121.344 18.2345 121.333 18.3252 121.322 18.3998H114.618C114.65 18.7732 114.736 19.1092 114.874 19.4078C115.024 19.7065 115.21 19.9678 115.434 20.1918C115.669 20.4052 115.93 20.5705 116.218 20.6878C116.517 20.8052 116.826 20.8638 117.146 20.8638C117.381 20.8638 117.61 20.8372 117.834 20.7838C118.069 20.7198 118.282 20.6345 118.474 20.5278C118.666 20.4105 118.837 20.2718 118.986 20.1118C119.136 19.9518 119.253 19.7758 119.338 19.5838L120.842 20.0158C120.554 20.6452 120.074 21.1625 119.402 21.5678C118.741 21.9625 117.968 22.1598 117.082 22.1598ZM119.626 17.1838C119.594 16.8318 119.504 16.5065 119.354 16.2078C119.216 15.9092 119.034 15.6585 118.81 15.4558C118.586 15.2425 118.325 15.0772 118.026 14.9598C117.728 14.8425 117.413 14.7838 117.082 14.7838C116.752 14.7838 116.437 14.8425 116.138 14.9598C115.85 15.0772 115.594 15.2425 115.37 15.4558C115.146 15.6585 114.965 15.9092 114.826 16.2078C114.688 16.5065 114.602 16.8318 114.57 17.1838H119.626Z"
                fill="white"
              ></path>
              <path
                d="M130.31 21.9998H128.55V17.3118C128.55 16.5225 128.422 15.9518 128.166 15.5998C127.921 15.2372 127.553 15.0558 127.062 15.0558C126.806 15.0558 126.55 15.1038 126.294 15.1998C126.038 15.2958 125.798 15.4345 125.574 15.6158C125.35 15.7865 125.147 15.9945 124.966 16.2398C124.795 16.4745 124.662 16.7358 124.566 17.0238V21.9998H122.806V13.6318H124.406V15.3118C124.726 14.7465 125.19 14.3038 125.798 13.9838C126.406 13.6532 127.078 13.4878 127.814 13.4878C128.315 13.4878 128.726 13.5785 129.046 13.7598C129.366 13.9412 129.617 14.1918 129.798 14.5118C129.99 14.8212 130.123 15.1838 130.198 15.5998C130.273 16.0052 130.31 16.4372 130.31 16.8958V21.9998Z"
                fill="white"
              ></path>
              <path
                d="M136.894 21.9998V10.6398H141.566C142.046 10.6398 142.489 10.7412 142.894 10.9438C143.3 11.1465 143.646 11.4185 143.934 11.7598C144.233 12.0905 144.462 12.4692 144.622 12.8958C144.793 13.3118 144.878 13.7332 144.878 14.1598C144.878 14.6185 144.798 15.0612 144.638 15.4878C144.489 15.9145 144.27 16.2932 143.982 16.6238C143.705 16.9545 143.369 17.2212 142.974 17.4238C142.58 17.6158 142.142 17.7118 141.662 17.7118H137.71V21.9998H136.894ZM137.71 16.9598H141.63C142.004 16.9598 142.34 16.8852 142.638 16.7358C142.937 16.5758 143.188 16.3678 143.39 16.1118C143.604 15.8452 143.764 15.5465 143.87 15.2158C143.988 14.8745 144.046 14.5225 144.046 14.1598C144.046 13.7865 143.977 13.4345 143.838 13.1038C143.71 12.7625 143.529 12.4638 143.294 12.2078C143.07 11.9518 142.804 11.7492 142.494 11.5998C142.196 11.4505 141.876 11.3758 141.534 11.3758H137.71V16.9598Z"
                fill="white"
              ></path>
              <path
                d="M150.528 14.3998C149.781 14.4212 149.125 14.6452 148.56 15.0718C148.005 15.4878 147.616 16.0638 147.392 16.7998V21.9998H146.592V13.6798H147.36V15.7278C147.648 15.1412 148.026 14.6665 148.496 14.3038C148.976 13.9305 149.488 13.7172 150.032 13.6638C150.138 13.6532 150.234 13.6478 150.32 13.6478C150.405 13.6478 150.474 13.6478 150.528 13.6478V14.3998Z"
                fill="white"
              ></path>
              <path
                d="M155.111 22.1598C154.524 22.1598 153.98 22.0478 153.479 21.8238C152.988 21.5892 152.562 21.2745 152.199 20.8798C151.836 20.4852 151.554 20.0265 151.351 19.5038C151.148 18.9812 151.047 18.4318 151.047 17.8558C151.047 17.2692 151.148 16.7145 151.351 16.1918C151.564 15.6692 151.852 15.2105 152.215 14.8158C152.578 14.4212 153.004 14.1118 153.495 13.8878C153.996 13.6532 154.535 13.5358 155.111 13.5358C155.687 13.5358 156.22 13.6532 156.711 13.8878C157.202 14.1118 157.628 14.4212 157.991 14.8158C158.364 15.2105 158.652 15.6692 158.855 16.1918C159.068 16.7145 159.175 17.2692 159.175 17.8558C159.175 18.4318 159.068 18.9812 158.855 19.5038C158.652 20.0265 158.37 20.4852 158.007 20.8798C157.644 21.2745 157.212 21.5892 156.711 21.8238C156.22 22.0478 155.687 22.1598 155.111 22.1598ZM151.847 17.8878C151.847 18.3785 151.932 18.8425 152.103 19.2798C152.274 19.7065 152.503 20.0798 152.791 20.3998C153.09 20.7198 153.436 20.9758 153.831 21.1678C154.226 21.3492 154.647 21.4398 155.095 21.4398C155.543 21.4398 155.964 21.3492 156.359 21.1678C156.754 20.9758 157.1 20.7145 157.399 20.3838C157.698 20.0532 157.932 19.6745 158.103 19.2478C158.274 18.8105 158.359 18.3412 158.359 17.8398C158.359 17.3492 158.274 16.8905 158.103 16.4638C157.932 16.0265 157.698 15.6478 157.399 15.3278C157.1 14.9972 156.754 14.7358 156.359 14.5438C155.975 14.3518 155.559 14.2558 155.111 14.2558C154.663 14.2558 154.242 14.3518 153.847 14.5438C153.452 14.7358 153.106 14.9972 152.807 15.3278C152.519 15.6585 152.284 16.0478 152.103 16.4958C151.932 16.9332 151.847 17.3972 151.847 17.8878Z"
                fill="white"
              ></path>
              <path
                d="M164.516 22.1598C163.94 22.1598 163.406 22.0425 162.916 21.8078C162.425 21.5625 161.998 21.2425 161.636 20.8478C161.284 20.4425 161.006 19.9838 160.804 19.4718C160.612 18.9492 160.516 18.4105 160.516 17.8558C160.516 17.2798 160.612 16.7305 160.804 16.2078C160.996 15.6852 161.262 15.2265 161.604 14.8318C161.945 14.4372 162.345 14.1225 162.804 13.8878C163.273 13.6532 163.785 13.5358 164.34 13.5358C164.702 13.5358 165.044 13.5892 165.364 13.6958C165.684 13.8025 165.982 13.9465 166.26 14.1278C166.537 14.2985 166.788 14.5012 167.012 14.7358C167.236 14.9705 167.428 15.2212 167.588 15.4878V10.3198H168.388V20.8798C168.388 21.1465 168.5 21.2798 168.724 21.2798V21.9998C168.66 22.0105 168.606 22.0158 168.564 22.0158C168.521 22.0265 168.478 22.0318 168.436 22.0318C168.222 22.0318 168.041 21.9518 167.892 21.7918C167.742 21.6212 167.668 21.4452 167.668 21.2638V20.3358C167.326 20.8905 166.868 21.3332 166.292 21.6638C165.726 21.9945 165.134 22.1598 164.516 22.1598ZM164.66 21.4398C164.948 21.4398 165.257 21.3812 165.588 21.2638C165.918 21.1465 166.222 20.9865 166.5 20.7838C166.788 20.5705 167.033 20.3305 167.236 20.0638C167.438 19.7972 167.556 19.5092 167.588 19.1998V16.4638C167.47 16.1652 167.3 15.8825 167.076 15.6158C166.862 15.3385 166.617 15.1038 166.34 14.9118C166.062 14.7092 165.764 14.5492 165.444 14.4318C165.124 14.3145 164.814 14.2558 164.516 14.2558C164.036 14.2558 163.598 14.3625 163.204 14.5758C162.809 14.7785 162.473 15.0505 162.196 15.3918C161.918 15.7225 161.705 16.1065 161.556 16.5438C161.406 16.9705 161.332 17.4132 161.332 17.8718C161.332 18.3518 161.417 18.8052 161.588 19.2318C161.758 19.6585 161.993 20.0372 162.292 20.3678C162.601 20.6985 162.953 20.9598 163.348 21.1518C163.753 21.3438 164.19 21.4398 164.66 21.4398Z"
                fill="white"
              ></path>
              <path
                d="M173.512 22.1598C171.741 22.1598 170.855 20.9332 170.855 18.4798V13.6798H171.656V18.3678C171.656 20.4158 172.354 21.4398 173.751 21.4398C174.103 21.4398 174.445 21.3812 174.775 21.2638C175.106 21.1358 175.416 20.9652 175.704 20.7518C175.992 20.5278 176.242 20.2612 176.456 19.9518C176.68 19.6425 176.856 19.3012 176.984 18.9278V13.6798H177.784V20.8798C177.784 21.1465 177.896 21.2798 178.12 21.2798V21.9998C178.066 22.0105 178.018 22.0158 177.975 22.0158C177.933 22.0158 177.901 22.0158 177.88 22.0158C177.666 22.0158 177.474 21.9518 177.303 21.8238C177.143 21.6852 177.064 21.5038 177.064 21.2798V20.0318C176.701 20.7038 176.199 21.2265 175.559 21.5998C174.93 21.9732 174.248 22.1598 173.512 22.1598Z"
                fill="white"
              ></path>
              <path
                d="M179.75 17.8078C179.75 17.2212 179.851 16.6665 180.054 16.1438C180.257 15.6212 180.539 15.1678 180.902 14.7838C181.265 14.3998 181.697 14.0958 182.198 13.8718C182.699 13.6478 183.249 13.5358 183.846 13.5358C184.603 13.5358 185.27 13.7065 185.846 14.0478C186.422 14.3892 186.854 14.8638 187.142 15.4718L186.358 15.7278C186.113 15.2692 185.761 14.9118 185.302 14.6558C184.854 14.3892 184.358 14.2558 183.814 14.2558C183.355 14.2558 182.929 14.3465 182.534 14.5278C182.139 14.7092 181.793 14.9598 181.494 15.2798C181.206 15.5998 180.977 15.9785 180.806 16.4158C180.635 16.8425 180.55 17.3065 180.55 17.8078C180.55 18.3092 180.635 18.7838 180.806 19.2318C180.987 19.6692 181.222 20.0532 181.51 20.3838C181.809 20.7038 182.155 20.9598 182.55 21.1518C182.955 21.3438 183.382 21.4398 183.83 21.4398C184.118 21.4398 184.401 21.3972 184.678 21.3118C184.966 21.2265 185.227 21.1145 185.462 20.9758C185.707 20.8372 185.915 20.6772 186.086 20.4958C186.267 20.3038 186.39 20.1065 186.454 19.9038L187.238 20.1278C187.131 20.4158 186.966 20.6878 186.742 20.9438C186.529 21.1892 186.273 21.4025 185.974 21.5838C185.675 21.7652 185.345 21.9038 184.982 21.9998C184.619 22.1065 184.246 22.1598 183.862 22.1598C183.275 22.1598 182.731 22.0478 182.23 21.8238C181.729 21.5892 181.291 21.2745 180.918 20.8798C180.555 20.4745 180.267 20.0105 180.054 19.4878C179.851 18.9652 179.75 18.4052 179.75 17.8078Z"
                fill="white"
              ></path>
              <path
                d="M192.757 21.5998C192.714 21.6212 192.64 21.6638 192.533 21.7278C192.437 21.7812 192.309 21.8345 192.149 21.8878C192 21.9412 191.829 21.9892 191.637 22.0318C191.445 22.0745 191.237 22.0958 191.013 22.0958C190.789 22.0958 190.576 22.0638 190.373 21.9998C190.181 21.9358 190.01 21.8398 189.861 21.7118C189.712 21.5838 189.594 21.4292 189.509 21.2478C189.424 21.0665 189.381 20.8532 189.381 20.6078V14.3358H188.213V13.6798H189.381V10.8318H190.181V13.6798H192.117V14.3358H190.181V20.4158C190.181 20.7252 190.288 20.9598 190.501 21.1198C190.714 21.2692 190.954 21.3438 191.221 21.3438C191.552 21.3438 191.834 21.2905 192.069 21.1838C192.314 21.0665 192.464 20.9918 192.517 20.9598L192.757 21.5998Z"
                fill="white"
              ></path>
            </svg>
          </Link>
          <p className="md:text-right text-xs mt-3 opacity-75 whitespace-pre-wrap leading-4 text-white">
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </p>
        </div>
      </div>
    </footer>
  );
};

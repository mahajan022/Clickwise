import { useState } from "react";
import { useInView, PageBanner } from "../components";
import { WORKS } from "../globals";

const TOOLS = [
  { name: "Figma",       bg: "#FFF0EB", color: "#F24E1E", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4C1.792 4 0 5.792 0 8s1.792 4 4 4h4V4zM12 4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4zm4 10h-4v4c0 2.208 1.792 4 4 4s4-1.792 4-4-1.792-4-4-4zM8 12H4c-2.208 0-4 1.792-4 4s1.792 4 4 4h4v-8z"/></svg> },
  { name: "React",       bg: "#E8F7FF", color: "#61DAFB", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.139s-2.018 3.25-5.535 4.14l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.007 2.4l.34.349-.34.349a23.552 23.552 0 0 0-2.422 3.124l-.134.2-.235.02a23.394 23.394 0 0 0-3.83.423l-.076.458zm1.143-6.95c-.334 0-.635.07-.877.21-1.01.583-1.27 2.6-.634 5.382a24.76 24.76 0 0 1 3.2-.384 24.57 24.57 0 0 1 2.084-2.382C9.266 2.789 7.483 1.995 6.453 1.995z"/></svg> },
  { name: "Next.js",     bg: "#F0F0F0", color: "#000000", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 4.953 20.366 1.167 15.999.18c-.701-.149-1.441-.243-2.208-.28C13.537.007 11.677-.003 11.572 0z"/></svg> },
  { name: "Tailwind",    bg: "#E0F7FA", color: "#06B6D4", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
  { name: "Node.js",     bg: "#F0FFF0", color: "#339933", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.087.050-.140.145-.140.243v10.15c0 .097.053.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.661.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.570.328.923.942.923 1.603v10.15c0 .661-.353 1.275-.923 1.604l-8.794 5.076c-.280.163-.600.247-.925.247z"/></svg> },
  { name: "MongoDB",     bg: "#F0FFF4", color: "#47A248", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg> },
  { name: "Canva",       bg: "#FFF0F5", color: "#00C4CC", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.97 8.764a3.44 3.44 0 0 1 .3 1.406c0 2.944-2.297 6.342-8.597 6.342a8.537 8.537 0 0 1-4.327-1.172c-.225-.131-.044-.493.198-.409a11.589 11.589 0 0 0 3.777.627 10.9 10.9 0 0 0 6.74-2.19 4.24 4.24 0 0 0 1.676-2.885l-.064-.066a.238.238 0 0 0-.408.165c-.17 2.05-2.147 3.795-4.516 4.302a7.72 7.72 0 0 1-5.31-.691c-1.465-.838-2.341-2.075-2.341-3.36 0-1.876 1.456-3.673 4.176-4.937a8.22 8.22 0 0 1 3.597-.819c2.207 0 3.946.938 4.514 2.324.165.404-.038.865-.44 1.05a.94.94 0 0 1-1.09-.225c-.43-.516-1.18-.837-2.013-.837-1.813 0-3.49 1.33-3.49 3.002 0 1.29.962 2.095 2.293 2.095 1.075 0 2.042-.474 2.682-1.273a.24.24 0 0 0-.048-.337.24.24 0 0 0-.338.048 2.97 2.97 0 0 1-2.296 1.08c-.945 0-1.565-.536-1.565-1.38 0-1.126 1.028-2.098 2.27-2.098.65 0 1.182.27 1.406.71a.455.455 0 0 0 .61.197.455.455 0 0 0 .197-.61z"/></svg> },
  { name: "WordPress",   bg: "#EEF5FF", color: "#21759B", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12C24 5.372 18.627 0 12 0zM1.215 12c0-1.695.37-3.303 1.031-4.75L7.23 21.664C3.636 19.98 1.215 16.268 1.215 12zm10.785 10.785c-1.149 0-2.256-.168-3.303-.479l3.506-10.186 3.592 9.842c.023.059.051.115.081.168-1.21.42-2.502.655-3.876.655zm1.7-18.084c.742-.039 1.41-.117 1.41-.117.664-.078.586-1.055-.078-1.016 0 0-1.994.156-3.282.156-1.211 0-3.245-.156-3.245-.156-.664-.039-.742.977-.078 1.016 0 0 .626.078 1.29.117l1.916 5.248-2.69 8.068-4.478-12.316c.742-.039 1.41-.117 1.41-.117.664-.078.586-1.055-.078-1.016 0 0-1.994.156-3.283.156-.231 0-.503-.006-.79-.016C4.41 2.697 8.018 1.215 12 1.215c2.912 0 5.564 1.116 7.551 2.937-.048-.003-.096-.009-.146-.009-1.211 0-2.07 1.055-2.07 2.187 0 1.016.586 1.876 1.211 2.891.469.82 1.016 1.876 1.016 3.399 0 1.055-.406 2.277-.937 3.984l-1.229 4.102-4.496-12.01zm4.428 16.817 3.554-10.271c.66-1.654.883-2.975.883-4.152 0-.427-.028-.822-.079-1.191A10.785 10.785 0 0 1 22.785 12c0 3.989-2.157 7.479-5.657 9.518z"/></svg> },
  { name: "Shopify",     bg: "#F0FFF0", color: "#96BF48", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.337 23.979l7.216-1.561s-2.585-17.474-2.601-17.58c-.017-.105-.106-.173-.196-.173s-1.924-.136-1.924-.136-.941-.94-1.03-1.03c-.09-.09-.106-.106-.196-.106l-1.269 20.586zM11.128 7.506s-.362-.105-1.015-.181c-.121-1.015-.528-2.782-1.694-2.782-.045 0-.105.015-.15.015-.226-.3-.512-.421-.768-.421-1.905 0-2.827 2.381-3.114 3.592-1.03.316-1.754.542-1.859.587-.587.181-.602.196-.662.752C1.82 9.56 0 23.428 0 23.428L15.758 24 11.128 7.506zm-1.94.557c-.512.15-1.089.331-1.68.512.181-.693.557-1.739 1.12-2.411.211.436.391 1.015.557 1.89l.003.009zm-.828-2.592c.226 0 .406.06.572.151-.798.858-1.229 2.14-1.44 3.189-.406.12-.797.241-1.18.361C6.63 7.641 7.42 5.471 8.36 5.471zm.632 8.778c0 1.454-1.09 2.14-2.396 2.14-.33 0-.692-.06-1.02-.18l.391-1.59c.271.09.572.15.842.15.497 0 .738-.196.738-.617 0-.963-1.32-.827-1.32-2.642 0-1.35.872-2.682 2.747-2.682.33 0 .633.045.873.12l-.391 1.59c-.226-.075-.467-.12-.707-.12-.452 0-.737.226-.737.602 0 .918 1.38.738 1.38 2.229zM12.308 24l3.43-.737-1.455-9.152-1.975 9.889z"/></svg> },
  { name: "Google Ads",  bg: "#FFFBEB", color: "#4285F4", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.996 3.005c-1.229-.004-2.447.52-3.328 1.582L2.571 16.005A4.375 4.375 0 0 0 9.52 21.44l3.49-4.282-2.66-3.263 5.13-6.294-.001-.001 2.66 3.262 1.867-2.29a4.375 4.375 0 0 0-5.01-5.567zM2.38 16.242A4.375 4.375 0 0 0 9.52 21.44l-7.14-5.198zm19.25-5.678-5.512 6.76 2.657 3.26a4.374 4.374 0 0 0 2.855-10.02z"/></svg> },
  { name: "Meta Ads",    bg: "#EEF3FF", color: "#0081FB", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 2.946 1.22 1.648 0 2.93-.752 3.814-2.014C23.585 18.194 24 16.87 24 14.449c0-2.917-.87-5.807-2.347-7.573C20.342 5.048 18.84 4.03 17.153 4.03c-1.248 0-2.35.474-3.105 1.273-.741.784-1.199 1.88-1.436 3.049a11.14 11.14 0 0 0-.34 2.072c-.066-.107-.132-.214-.2-.32-1.614-2.495-2.81-3.891-3.75-4.676a5.024 5.024 0 0 0-1.407-.844 5.09 5.09 0 0 0-2-.554zm0 1.44c1.16 0 2.071.534 3.18 1.943a22.795 22.795 0 0 1 2.165 3.835l.246.499c-1.327 2.31-2.244 3.823-2.93 4.74-1.182 1.587-2.09 2.063-3.097 2.063-1.331 0-2.12-.538-2.64-1.403-.162-.272-.296-.594-.4-.978a7.008 7.008 0 0 1-.175-1.69c0-2.271.63-4.676 1.783-6.349.96-1.406 2.106-2.66 3.868-2.66zm10.238 0c1.126 0 2.212.84 3.127 2.134C21.4 9.285 22.202 11.814 22.2 14.449c0 1.932-.33 3.014-.93 3.881-.476.688-1.136 1.07-2.203 1.07-.757 0-1.378-.184-2.243-.98-.741-.68-1.548-1.85-2.307-3.119l-2.208-3.68c.061-1.004.237-2.03.608-2.876.42-.965.99-1.72 1.718-2.19.66-.432 1.378-.635 2.22-.635z"/></svg> },
  { name: "Zapier",      bg: "#FFF5F0", color: "#FF4A00", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.879 12.002c0 1.59-1.29 2.879-2.88 2.879-1.59 0-2.879-1.29-2.879-2.88 0-1.589 1.29-2.878 2.88-2.878 1.59 0 2.879 1.289 2.879 2.879zm9.121-.002v-.016l-4.567.005-.002-.018a6.622 6.622 0 0 0-1.604-3.87l.013-.013 3.23-3.229-.012-.014A11.956 11.956 0 0 0 12.028 0h-.016v4.567l-.018.002a6.622 6.622 0 0 0-3.87 1.604L8.111 6.16 4.882 2.93l-.014.012A11.956 11.956 0 0 0 0 11.97v.016l4.567-.005.002.018a6.622 6.622 0 0 0 1.604 3.87l-.013.013-3.23 3.229.012.014A11.956 11.956 0 0 0 11.97 24h.016v-4.567l.018-.002a6.622 6.622 0 0 0 3.87-1.604l.013.013 3.229 3.23.014-.012A11.956 11.956 0 0 0 24 12.028v-.028z"/></svg> },
  { name: "GitHub",      bg: "#F0F0F0", color: "#181717", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { name: "Netlify",     bg: "#E8FFF9", color: "#00C7B7", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.652-.652v1.467zM13.108 5.7l.82 3.172 1.987-.803-2.807-2.369zM11.458 5l-1.553.624 1.39 1.173.163-1.797zM9.086 5.546a1.045 1.045 0 0 1 .522-.373L9.354 4H7.833L9.086 5.546zM19.48 9.694l-2.59 1.152c.062.133.1.28.1.435v.073l2.495 1.234V9.694zM17.49 13.208a1.044 1.044 0 0 1-.423.32v2.35l3.002-1.788-2.579-1.881zM17.067 8.33a1.044 1.044 0 0 1 .367-.13v-.8l-2.394-.588 2.027 1.518zM21 16.035l-7.947 4.73V22l9.947-5.949L21 16.035zM13.053 20.795v-1.25L6.12 16.02l-.927.551 7.86 4.224zM5 16.682l.56-.334L5 16.05V16.682zM11.763 3v1.204l1.317 1.11.42-2.314H11.763zM3.356 10.91l2.01 2.012L5 12.622V10.8L3.356 10.91zM5 13.421l.55-.322-1.07-1.072L5 13.421zM13.053 5.93l-.813 2.31.813.813V5.93zM5.81 16.15l7.243 3.868V8.053l-7.243 8.097z"/></svg> },
  { name: "VS Code",     bg: "#EEF3FF", color: "#007ACC", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.983V4.017a1.5 1.5 0 0 0-.85-1.43zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg> },
];

function ToolCard({ tool, i, v2, toolHovered, setToolHovered }) {
  return (
    <div
      onMouseEnter={() => setToolHovered(i)}
      onMouseLeave={() => setToolHovered(null)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        width: 120,
        height: 120,
        borderRadius: 24,
        background: tool.bg,
        cursor: "default",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        transform: toolHovered === i ? "translateY(-6px) scale(1.05)" : "none",
        boxShadow: toolHovered === i ? `0 16px 40px ${tool.color}30` : "0 2px 8px rgba(0,0,0,.06)",
        opacity: v2 ? 1 : 0,
        transitionDelay: `${i * 0.04}s`,
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        color: tool.color,
        transition: "transform .3s",
        transform: toolHovered === i ? "scale(1.1)" : "scale(1)",
      }}>
        {tool.svg}
      </div>
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        color: tool.color,
        textAlign: "center",
        letterSpacing: "0.02em",
        opacity: 0.85,
      }}>
        {tool.name}
      </span>
    </div>
  );
}

export default function Work() {
  const [ref, v] = useInView();
  const [ref2, v2] = useInView();
  const [hovered, setHovered] = useState(null);
  const [toolHovered, setToolHovered] = useState(null);

  return (
    <div className="page-enter">
      <PageBanner
        tag="WORK"
        title="Projects That Made Impact."
        sub="A selection of brands we've helped grow. Every project tells a story of strategy, design, and results."
        bg="/work-banner.png"
      />

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ background: "#fff", padding: "100px clamp(20px,5vw,80px)" }}>
        {/* ✅ FIX: ref moved here to the parent div, NOT inside the map */}
        <div ref={ref} style={{ maxWidth: 1320, margin: "0 auto" }}>
          {WORKS.map((w, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.1fr 1fr" : "1fr 1.1fr",
                  gap: "clamp(40px,5vw,80px)",
                  alignItems: "center",
                  marginBottom: i < WORKS.length - 1 ? "clamp(80px,10vw,140px)" : 0,
                  opacity: v ? 1 : 0,
                  transform: v ? "none" : "translateY(40px)",
                  transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${i * 0.15}s, transform .7s cubic-bezier(.16,1,.3,1) ${i * 0.15}s`,
                }}
              >
                {/* Image */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  <div
                    style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img
                      src={w.image}
                      alt={w.title}
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                        transform: hovered === i ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(17,17,17,.5)",
                      opacity: hovered === i ? 1 : 0,
                      transition: "opacity .4s ease",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <a
                        href={w.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          background: "#fff", color: "#111111",
                          padding: "14px 32px", borderRadius: 8,
                          textDecoration: "none", fontSize: 13, fontWeight: 700,
                          display: "inline-flex", alignItems: "center", gap: 8,
                          transform: hovered === i ? "translateY(0)" : "translateY(12px)",
                          transition: "transform .4s cubic-bezier(.16,1,.3,1) .05s",
                        }}
                      >
                        View Live Site
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div style={{ order: isEven ? 1 : 0 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,71,26,.08)", padding: "6px 14px", borderRadius: 20, marginBottom: 20 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8471A" }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#E8471A", letterSpacing: "0.15em", textTransform: "uppercase" }}>{w.tag}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>{w.title}</h2>
                  <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.9, marginBottom: 32 }}>{w.desc}</p>
                  <div style={{ display: "flex", gap: 32, marginBottom: 36, paddingBottom: 32, borderBottom: "1px solid #E4E3DD" }}>
                    {[
                      { label: "Category", value: w.cat },
                      { label: "Status", value: "Live ✓" },
                    ].map((m, j) => (
                      <div key={j}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{m.label}</p>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={w.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#111111", color: "#fff", padding: "14px 28px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, transition: "all .25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#E8471A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.transform = "none"; }}
                  >
                    View Live Site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TOOLS WE USE ── */}
      <section
        style={{
          position: "relative",
          backgroundImage: "url('/tools-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: "200px clamp(40px,8vw,180px)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(247, 247, 245, 0.88)" }} />
        <div ref={ref2} style={{ position: "relative", zIndex: 1, maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72, opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1)" }}>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", marginBottom: 12 }}>
              Tools We Use To Deliver Results
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
              Industry-leading tools and platforms — chosen for performance, reliability, and results.
            </p>
          </div>

          {/* Row 1 — 7 icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
            {TOOLS.slice(0, 7).map((tool, i) => (
              <ToolCard key={i} tool={tool} i={i} v2={v2} toolHovered={toolHovered} setToolHovered={setToolHovered} />
            ))}
          </div>
          {/* Row 2 — 8 icons centered */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {TOOLS.slice(7).map((tool, i) => (
              <ToolCard key={i + 7} tool={tool} i={i + 7} v2={v2} toolHovered={toolHovered} setToolHovered={setToolHovered} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#E8471A", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: "#fff", marginBottom: 20, lineHeight: 1.1, letterSpacing: "-1px" }}>
            Ready to be our next success story?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.85)", marginBottom: 36, lineHeight: 1.8 }}>
            Let's work together to build something that stands out and drives real results.
          </p>
          <a href="/contact" className="btn-white" style={{ textDecoration: "none" }}>Start Your Project →</a>
        </div>
      </section>
    </div>
  );
}
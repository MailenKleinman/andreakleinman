/* =========================================================
   Per-banner project modal.

   Every banner's "+ More Info" button opens the SAME modal
   element (#info-modal), but filled with that banner's content.
   The content lives in the `projects` array below, in the same
   order as the banners on the page (1st banner -> projects[0],
   and so on).

   >>> EDIT THE `projects` ARRAY BELOW to set each project's
       title, role, video, type, and footer links. <<<

   Fields per project:
     title    – project name
     role     – "Editora" or "Editora"
     video    – YouTube *embed* URL (https://www.youtube.com/embed/VIDEO_ID)
     type     – "Feature Film", "Documentary", or "Series — N episodes"
     platform – { label, url, icon }  (icon = a Bootstrap Icons class)
     imdb     – IMDb page URL

   Closes via the × button, clicking outside (backdrop), or Esc.
   ========================================================= */
(function () {
	"use strict";

	// ---- Placeholder content — replace later -------------------
	var YT_PLACEHOLDER = "https://www.youtube.com/embed/dQw4w9WgXcQ";

	var projects = [
		{
			title: "Cromañón",
			role: "Editora",
			video: "https://www.youtube.com/embed/MDMN4FHG2J4",
			type: "Serie — 8 episodios",
			platform: { label: "Amazon", url: "https://www.primevideo.com/detail/amzn1.dv.gti.99a77d1c-9353-43ec-b751-3d559ab096fd", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt33366664/?ref_=nm_flmg_job_1_accord_1_cdt_t_4"
		},
		{
			title: "Porno y Helado",
			role: "Editora",
			video: "https://www.youtube.com/embed/QhzxyRjD4KM",
			type: "Serie - 6 episodios",
			platform: { label: "Amazon", url: "https://www.primevideo.com/-/es/detail/0LVVH5ZC59O0Q7OHZWD5GKUNXY", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es-es/title/tt14369952/?ref_=ttep_ov_bk"
		},
		{
			title: "El amor después del amor",
			role: "Editora",
			video: "https://www.youtube.com/embed/xUlJZ7AMaro",
			type: "Serie - 8 episodios",
			platform: { label: "Netflix", url: "https://www.netflix.com/ar-en/title/81219817?source=imdb&fromWatch=true", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt18280522/"
		},
		{
			title: "Las maldiciones",
			role: "Editora",
			video: "https://www.youtube.com/embed/UGRYEzE6ZkU",
			type: "Serie - 3 episodios",
			platform: { label: "Netflix", url: "https://www.netflix.com/ar/title/81749717", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt33292950/"
		},
		{
			title: "Baby Bandito",
			role: "Editora",
			video: "https://www.youtube.com/embed/8TO7BW9LSb8",
			type: "Serie — 8 episodes",
			platform: { label: "Netflix", url: "https://www.netflix.com/ar/title/81619198", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt27997713/"
		},
		{
			title: "El resto bien",
			role: "Editora",
			video: "https://www.youtube.com/embed/mihK29Yx6XQ",
			type: "Serie — 8 episodios",
			platform: { label: "Flow", url: "https://portal.app.flow.com.ar/ver/VODx25936459", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt38453829/"
		},
		{
			title: "Implosión",
			role: "Editora",
			video: "https://www.youtube.com/embed/gd2KRqAfa6Y",
			type: "Película",
			platform: { label: "Cine.ar", url: "https://play.cine.ar/INCAA/produccion/8888", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt10482032/"
		},
		{
			title: "NEY: Nosotros, ellos y yo",
			role: "Editora",
			video: "https://www.youtube.com/embed/uRwgoWZApbM",
			type: "Documental",
			platform: { label: "Cine.ar", url: "https://play.cine.ar/INCAA/produccion/9344", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt4598764/"
		},
		{
			title: "Raídos",
			role: "Editora",
			video: "https://www.youtube.com/embed/2KXm7-XLip8",
			type: "Documental",
			platform: { label: "Mubi", url: "https://mubi.com/es/ar/films/raidos", icon: "bi bi-camera-video" },
			imdb: "https://www.imdb.com/es/title/tt5642216/"
		},
	];
	// ------------------------------------------------------------

	var modal = document.getElementById("info-modal");
	if (!modal) { return; }

	var iframe = document.getElementById("im-video");
	var fields = {
		role: document.getElementById("im-role"),
		title: document.getElementById("im-title"),
		type: document.getElementById("im-type"),
		platform: document.getElementById("im-platform"),
		platformIcon: document.getElementById("im-platform-icon"),
		platformLabel: document.getElementById("im-platform-label"),
		imdb: document.getElementById("im-imdb")
	};

	function fill(p) {
		p = p || {};
		var platform = p.platform || {};
		fields.role.textContent = p.role || "";
		fields.title.textContent = p.title || "";
		fields.type.textContent = p.type || "";
		fields.platform.href = platform.url || "#";
		fields.platformIcon.className = platform.icon || "";
		fields.platformLabel.textContent = platform.label || "";
		fields.imdb.href = p.imdb || "#";
		iframe.src = p.video || "";
	}

	function openModal() {
		modal.classList.add("open");
		modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden"; // lock background scroll
	}

	function closeModal() {
		modal.classList.remove("open");
		modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
		iframe.src = ""; // stop video playback
	}

	// Wire each banner button to its project (by DOM order).
	var buttons = Array.prototype.slice.call(document.querySelectorAll(".more-info-btn"));
	buttons.forEach(function (btn, i) {
		btn.addEventListener("click", function (e) {
			e.preventDefault();
			fill(projects[i]);
			openModal();
		});
	});

	// Close on the × button or the backdrop (click outside the dialog).
	modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
		el.addEventListener("click", closeModal);
	});

	// Close on Esc.
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && modal.classList.contains("open")) {
			closeModal();
		}
	});
})();

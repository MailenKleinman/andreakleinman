/* =========================================================
   "+ More Info" modal for the home banners.

   - Any `.more-info-btn` opens the shared #info-modal.
   - Closes via the × button, clicking the backdrop (outside
     the dialog), or pressing Esc.
   - Content is a placeholder for now; fill in #info-modal later.
   ========================================================= */
(function () {
	"use strict";

	var modal = document.getElementById("info-modal");
	if (!modal) { return; }

	function openModal() {
		modal.classList.add("open");
		modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden"; // prevent background scroll
	}

	function closeModal() {
		modal.classList.remove("open");
		modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
	}

	// Open from any "+ More Info" button.
	document.querySelectorAll(".more-info-btn").forEach(function (btn) {
		btn.addEventListener("click", function (e) {
			e.preventDefault();
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

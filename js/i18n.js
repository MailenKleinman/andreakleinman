/* =========================================================
   Lightweight bilingual (EN/ES) switcher for the site.

   How it works:
   - Any element with a `data-i18n="some.key"` attribute is
     translatable. Its existing (English) text is captured as
     the default, so you only need to supply Spanish strings.
   - Add Spanish strings to the `dict.es` map below, keyed by
     the same `data-i18n` value.
   - The chosen language is saved in localStorage so it stays
     consistent as the visitor moves between pages.

   >>> To change the DEFAULT language, edit DEFAULT_LANG below. <<<
   (The dropdown's appearance in the HTML is only the initial
    paint; this script is the source of truth at runtime.)
   ========================================================= */
(function () {
	"use strict";

	// ---- Default language: "es" (Spanish) or "en" (English) ----
	var DEFAULT_LANG = "es";

	// Storage key. Bump the version suffix if you ever want to
	// force-ignore visitors' previously remembered choice.
	var STORAGE_KEY = "ak-lang-v2";

	// Spanish strings. English is read straight from the HTML.
	var dict = {
		es: {
			"nav.works": "Trabajo",
			"nav.about": "Acerca de",
			"nav.teaching": "Docencia",
			"nav.contact": "Contacto"
		}
	};

	var els = document.querySelectorAll("[data-i18n]");

	// Cache the original English text once.
	els.forEach(function (el) {
		el.setAttribute("data-i18n-en", el.textContent.trim());
	});

	function apply(lang, persist) {
		els.forEach(function (el) {
			var key = el.getAttribute("data-i18n");
			if (lang === "es" && dict.es[key]) {
				el.textContent = dict.es[key];
			} else {
				el.textContent = el.getAttribute("data-i18n-en");
			}
		});

		document.documentElement.setAttribute("lang", lang === "es" ? "es" : "en-US");

		var label = document.querySelector(".lang-current");
		if (label) { label.textContent = lang === "es" ? "ESP" : "ENG"; }

		document.querySelectorAll(".lang-menu a").forEach(function (a) {
			a.classList.toggle("active", a.getAttribute("data-lang") === lang);
		});

		// Only remember the choice when the visitor actually picks
		// one — never persist the default, so DEFAULT_LANG stays
		// authoritative.
		if (persist !== false) {
			try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
		}
	}

	// Initialise: use the visitor's explicit choice if they made
	// one, otherwise fall back to DEFAULT_LANG.
	var saved = null;
	try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
	apply(saved || DEFAULT_LANG, false);

	// Wire up the dropdown.
	var switcher = document.getElementById("lang-switcher");
	if (!switcher) { return; }

	var trigger = document.getElementById("lang-trigger");
	trigger.addEventListener("click", function (e) {
		e.preventDefault();
		var open = switcher.classList.toggle("open");
		trigger.setAttribute("aria-expanded", open ? "true" : "false");
	});

	switcher.querySelectorAll(".lang-menu a").forEach(function (a) {
		a.addEventListener("click", function (e) {
			e.preventDefault();
			apply(a.getAttribute("data-lang")); // persisted
			switcher.classList.remove("open");
			trigger.setAttribute("aria-expanded", "false");
		});
	});

	// Close when clicking outside.
	document.addEventListener("click", function (e) {
		if (!switcher.contains(e.target)) {
			switcher.classList.remove("open");
			trigger.setAttribute("aria-expanded", "false");
		}
	});
})();

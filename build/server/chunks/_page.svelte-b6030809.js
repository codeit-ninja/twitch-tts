import { i as copy_payload, j as assign_payload, k as bind_props, l as pop, E as create_anchor, L as attr, h as push, H as escape, M as stringify, O as ensure_array_like } from './index2-816b92d1.js';
import './client-a19d47e8.js';
import { uniqueId } from 'lodash-es';
import { b as useUserStore } from './store-d2261f1f.js';
import './exports-4ef2d035.js';

function Button($$payload, $$props) {
  push(true);
  const {
    label,
    variant = "primary",
    outline,
    type = "button",
    align = "start",
    icon
  } = $$props;
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${attr("class", `row mt-4 justify-content-${stringify(align)}`, false)}><div class="col-auto">${anchor}`;
  if (icon) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<button${attr("type", type, false)}${attr("class", `d-flex align-items-center gap-3 btn btn-${stringify(outline ? `outline-${variant}` : variant)}`, false)}><span class="material-symbols-rounded">${escape(icon)}</span> <span>${escape(label)}</span></button>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<button${attr("type", type, false)}${attr("class", `btn btn-${stringify(outline ? `outline-${variant}` : variant)}`, false)}>${escape(label)}</button>`;
  }
  $$payload.out += `${anchor}</div></div>`;
  bind_props($$props, {
    label,
    variant,
    outline,
    type,
    align,
    icon
  });
  pop();
}
function Form($$payload, $$props) {
  push(true);
  let { children, method, action, enhance } = $$props;
  const anchor = create_anchor($$payload);
  $$payload.out += `<form${attr("method", method, false)}${attr("action", action, false)}>${anchor}`;
  children($$payload);
  $$payload.out += `${anchor}</form>`;
  bind_props($$props, { children, method, action, enhance });
  pop();
}
function Section($$payload, $$props) {
  push(true);
  const { title, icon, children } = $$props;
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<section><h6><span class="material-symbols-rounded">${escape(icon)}</span> ${anchor}`;
  if (icon) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<span>${escape(title)}</span>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}</h6> ${anchor_1}`;
  if (children) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    children($$payload);
    $$payload.out += `${anchor_2}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_1}</section>`;
  bind_props($$props, { title, icon, children });
  pop();
}
function Radio($$payload, $$props) {
  push(true);
  let {
    value,
    name,
    width = "full",
    label,
    disabled = false,
    options,
    description
  } = $$props;
  console.log(options);
  const id = uniqueId("radio-input-");
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const each_array = ensure_array_like(options);
  const anchor_3 = create_anchor($$payload);
  $$payload.out += `<div class="row"><div${attr(
    "class",
    [
      width === "full" ? "col-12" : "",
      width === "lg" ? "col-md-8" : "",
      width === "md" ? "col-md-6" : "",
      width === "sm" ? "col-md-4" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor}`;
  if (label) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<label class="form-label d-block mb-3"${attr("for", id, false)}>${escape(label)}</label>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} ${anchor_1}`;
  for (let i = 0; i < each_array.length; i++) {
    const option = each_array[i];
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}<div class="form-check form-check-inline"><input class="form-check-input" type="radio"${attr("value", option, false)}${attr("checked", value === option, true)}${attr("disabled", disabled, true)}${attr("name", name, false)}${attr("id", `${id}-${i}`, false)}> <label class="form-check-label"${attr("for", `${id}-${i}`, false)}>${escape(option)}</label></div>${anchor_2}`;
  }
  $$payload.out += `${anchor_1}</div> <div class="col-12">${anchor_3}`;
  if (description) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="form-text">${escape(description)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_3}</div></div>`;
  bind_props($$props, {
    value,
    name,
    width,
    label,
    disabled,
    options,
    description
  });
  pop();
}
function Select($$payload, $$props) {
  push(true);
  let {
    value,
    name,
    width = "md",
    label,
    disabled = false,
    description,
    options,
    optionLabel,
    optionValue
  } = $$props;
  const id = uniqueId("select-input-");
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const each_array = ensure_array_like(options);
  const anchor_3 = create_anchor($$payload);
  $$payload.out += `<div class="row"><div${attr(
    "class",
    [
      width === "full" ? "col-12" : "",
      width === "lg" ? "col-md-8" : "",
      width === "md" ? "col-md-6" : "",
      width === "sm" ? "col-md-4" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor}`;
  if (label) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<label class="form-label"${attr("for", id, false)}>${escape(label)}</label>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <select class="form-select"${attr("name", name, false)}${attr("id", id, false)}${attr("disabled", disabled, true)}>${anchor_1}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const option = each_array[$$index];
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}<option${attr("value", option[optionValue], false)}>${escape(option[optionLabel])}</option>${anchor_2}`;
  }
  $$payload.out += `${anchor_1}</select></div> <div class="col-12">${anchor_3}`;
  if (description) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="form-text">${escape(description)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_3}</div></div>`;
  bind_props($$props, {
    value,
    name,
    width,
    label,
    disabled,
    description,
    options,
    optionLabel,
    optionValue
  });
  pop();
}
function Switch($$payload, $$props) {
  push(true);
  let {
    name,
    checked,
    width = "md",
    label,
    disabled = false,
    description
  } = $$props;
  const id = uniqueId("switch-input-");
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div class="row"><div${attr(
    "class",
    [
      width === "full" ? "col-12" : "",
      width === "lg" ? "col-md-8" : "",
      width === "md" ? "col-md-6" : "",
      width === "sm" ? "col-md-4" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor}`;
  if (label) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<label class="form-label d-block"${attr("for", id, false)}>${escape(label)}</label>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch"${attr("checked", checked, true)}${attr("name", name, false)}${attr("disabled", disabled, true)}${attr("id", id, false)}> ${anchor_1}`;
  if (description) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<label class="form-check-label"${attr("for", id, false)}>${escape(description)}</label>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_1}</div></div></div>`;
  bind_props($$props, {
    name,
    checked,
    width,
    label,
    disabled,
    description
  });
  pop();
}
function Text($$payload, $$props) {
  push(true);
  let {
    value,
    name,
    width = "md",
    label,
    placeholder,
    disabled = false,
    description
  } = $$props;
  const id = uniqueId("text-input-");
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div class="row"><div${attr(
    "class",
    [
      width === "full" ? "col-12" : "",
      width === "lg" ? "col-md-8" : "",
      width === "md" ? "col-md-6" : "",
      width === "sm" ? "col-md-4" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor}`;
  if (label) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<label class="form-label"${attr("for", id, false)}>${escape(label)}</label>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <input type="text" class="form-control"${attr("value", value, false)}${attr("placeholder", placeholder, false)}${attr("disabled", disabled, true)}${attr("name", name, false)}${attr("id", id, false)}></div> <div class="col-12">${anchor_1}`;
  if (description) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="form-text">${escape(description)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_1}</div></div>`;
  bind_props($$props, {
    value,
    name,
    width,
    label,
    placeholder,
    disabled,
    description
  });
  pop();
}
function _page($$payload, $$props) {
  push(true);
  const { user } = useUserStore.get();
  const { data } = $$props;
  let enabled = !!data.defaults?.enabled;
  let selectedVoiceId = data.defaults?.voice?.id;
  let selectedVoice = data.voices.find((voice) => voice.Id === selectedVoiceId);
  let error = false;
  let success = false;
  const enhance = ({ formData }) => {
    if (!enabled) {
      formData.set("enabled", "off");
      formData.set("channel", user.username);
      formData.set("engine", "neural");
    }
    formData.set("voice", JSON.stringify(selectedVoice));
    return async ({ result, update }) => {
      if (result.type === "error" || result.type === "failure") {
        return error = true;
      }
      return success = true;
    };
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    $$payload2.out += `<h1 class="site--title">Text to Speech</h1> ${anchor}`;
    Form($$payload2, {
      method: "POST",
      enhance,
      action: "?/saveConfig",
      children: ($$payload3, $$slotProps) => {
        const anchor_1 = create_anchor($$payload3);
        const anchor_2 = create_anchor($$payload3);
        const anchor_3 = create_anchor($$payload3);
        $$payload3.out += `${anchor_1}`;
        if (error) {
          $$payload3.out += "<!--ssr:if:true-->";
          $$payload3.out += `<div class="note note-danger" role="alert">Something went wrong</div>`;
        } else {
          $$payload3.out += "<!--ssr:if:false-->";
        }
        $$payload3.out += `${anchor_1} ${anchor_2}`;
        if (success) {
          $$payload3.out += "<!--ssr:if:true-->";
          $$payload3.out += `<div class="note note-success" role="alert">Settings saved</div>`;
        } else {
          $$payload3.out += "<!--ssr:if:false-->";
        }
        $$payload3.out += `${anchor_2} ${anchor_3}`;
        Section($$payload3, {
          title: "Settings",
          icon: "record_voice_over",
          children: ($$payload4, $$slotProps2) => {
            const anchor_4 = create_anchor($$payload4);
            const anchor_5 = create_anchor($$payload4);
            const anchor_6 = create_anchor($$payload4);
            const anchor_7 = create_anchor($$payload4);
            const anchor_9 = create_anchor($$payload4);
            const anchor_10 = create_anchor($$payload4);
            $$payload4.out += `${anchor_4}`;
            Switch($$payload4, {
              get checked() {
                return enabled;
              },
              set checked($$value) {
                enabled = $$value;
                $$settled = false;
              },
              label: "Enable TTS",
              description: "Do you want to enable Text to Speech",
              width: "full",
              name: "enabled"
            });
            $$payload4.out += `${anchor_4} ${anchor_5}`;
            Text($$payload4, {
              value: user.username,
              label: "Twitch channel",
              disabled: !enabled,
              name: "channel"
            });
            $$payload4.out += `${anchor_5} ${anchor_6}`;
            Select($$payload4, {
              label: "Voice character",
              description: "Select the voice character you like the most.",
              width: "sm",
              options: data.voices,
              optionValue: "Id",
              optionLabel: "Name",
              disabled: !enabled,
              name: "voice",
              get value() {
                return selectedVoiceId;
              },
              set value($$value) {
                selectedVoiceId = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_6} ${anchor_7}`;
            if (selectedVoice) {
              $$payload4.out += "<!--ssr:if:true-->";
              const anchor_8 = create_anchor($$payload4);
              $$payload4.out += `${anchor_8}`;
              Radio($$payload4, {
                label: "Select voice type",
                value: "neural",
                options: selectedVoice.SupportedEngines,
                disabled: !enabled,
                name: "engine"
              });
              $$payload4.out += `${anchor_8}`;
            } else {
              $$payload4.out += "<!--ssr:if:false-->";
            }
            $$payload4.out += `${anchor_7} ${anchor_9}`;
            Button($$payload4, {
              variant: "secondary",
              label: "Test voice settings",
              type: "button",
              icon: "brand_awareness"
            });
            $$payload4.out += `${anchor_9} ${anchor_10}`;
            Button($$payload4, {
              variant: "primary",
              label: "Save settings",
              type: "submit"
            });
            $$payload4.out += `${anchor_10}`;
          }
        });
        $$payload3.out += `${anchor_3}`;
      }
    });
    $$payload2.out += `${anchor}`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { data });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-b6030809.js.map

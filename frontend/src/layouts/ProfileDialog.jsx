import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/slices/authSlice";

function ProfileDialog({ open, onClose }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  if (!open) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("agritwin_token");

    dispatch(clearUser());

    onClose();
  };

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        className="
          fixed
          inset-0
          z-[100]
          bg-black/20
          backdrop-blur-[3px]
        "
        onClick={onClose}
      />

      {/* =====================================================
          DIALOG
      ===================================================== */}

      <div
        className="
          fixed
          right-4
          top-[72px]
          z-[101]

          w-[320px]
          max-w-[calc(100vw-32px)]

          overflow-hidden
          rounded-[22px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface)]

          shadow-[0_20px_60px_rgba(0,0,0,0.15)]

          animate-in
          fade-in
          zoom-in-95
          duration-200

          sm:right-5
          lg:right-6
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-3
          "
        >
          <p
            className="
              text-[11px]
              font-bold
              text-[var(--color-text-primary)]
            "
          >
            My Profile
          </p>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg

              text-[var(--color-text-muted)]

              transition-all

              hover:bg-[var(--color-surface-secondary)]
              hover:text-[var(--color-text-primary)]

              active:scale-95
            "
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* ===================================================
            USER CARD
        =================================================== */}

        <div className="px-4 pb-4">
          <div
            className="
              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-[var(--color-border)]

              bg-[var(--color-surface-secondary)]

              p-3
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center

                rounded-[15px]

                bg-[var(--color-primary)]

                text-sm
                font-bold
                text-white

                shadow-[0_5px_15px_rgba(22,163,74,0.25)]
              "
            >
              {initials}
            </div>

            {/* User info */}

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[12px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                {user?.name || "User"}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[9px]
                  text-[var(--color-text-muted)]
                "
              >
                {user?.email || "No email"}
              </p>

              <span
                className="
                  mt-1.5
                  inline-flex
                  items-center
                  rounded-md

                  bg-[var(--color-primary)]/10

                  px-1.5
                  py-0.5

                  text-[7px]
                  font-bold
                  uppercase
                  tracking-wide

                  text-[var(--color-primary)]
                "
              >
                {user?.role || "USER"}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            OPTIONS
        =================================================== */}

        <div className="px-3 pb-3">
          {/* Profile */}

          <button
            type="button"
            className="
              group
              flex
              w-full
              items-center
              gap-3

              rounded-xl

              px-3
              py-2.5

              text-left

              transition-all

              hover:bg-[var(--color-primary)]/8
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-lg

                bg-[var(--color-primary)]/10

                text-[var(--color-primary)]
              "
            >
              <User
                size={15}
                strokeWidth={1.9}
              />
            </div>

            <div className="flex-1">
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--color-text-primary)]
                "
              >
                View Profile
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                  text-[var(--color-text-muted)]
                "
              >
                Manage your account
              </p>
            </div>

            <ChevronRight
              size={14}
              className="
                text-[var(--color-text-muted)]

                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </button>

          {/* Account Info */}

          <div
            className="
              my-2
              h-px
              bg-[var(--color-border)]
            "
          />

          <div
            className="
              px-3
              py-2
            "
          >
            <div className="flex items-center gap-2">
              <Mail
                size={13}
                className="text-[var(--color-text-muted)]"
              />

              <span
                className="
                  truncate
                  text-[9px]
                  text-[var(--color-text-secondary)]
                "
              >
                {user?.email || "No email available"}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <ShieldCheck
                size={13}
                className="text-[var(--color-primary)]"
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  text-[var(--color-text-secondary)]
                "
              >
                {user?.authProvider || "LOCAL"} account
              </span>
            </div>
          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-2
              flex
              w-full
              items-center
              gap-3

              rounded-xl

              px-3
              py-2.5

              text-left

              transition-all

              hover:bg-[var(--color-danger)]/10
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-lg

                bg-[var(--color-danger)]/10

                text-[var(--color-danger)]
              "
            >
              <LogOut
                size={15}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--color-danger)]
                "
              >
                Logout
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                  text-[var(--color-text-muted)]
                "
              >
                Sign out from this account
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileDialog;
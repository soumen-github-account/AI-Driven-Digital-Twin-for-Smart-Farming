
const Faq = () => {
  return (
    <div>
      <section class="bg-black w-full flex flex-col items-center justify-center py-20 px-4">
    <div class="w-full max-w-5xl">
        <div class="mb-12">
            <h2 class="text-5xl font-medium text-neutral-50 text-center">FAQ's</h2>
            <p class="text-neutral-100 max-w-[540px] text-base/6 text-center mx-auto mt-5">Find answers to the most frequently asked questions about our platform, features, pricing and how we help businesses grow faster.</p>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-y-0">
            <div class="space-y-4">
                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">What features are included in each plan?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Each plan includes core workflow tools, analytics and customer support, with higher tiers unlocking more automation, advanced reporting and collaboration features.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Can I upgrade or downgrade my plan anytime?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Yes, you can switch plans whenever your needs change and the update will reflect directly in your billing cycle.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Is my data safe and protected?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Your data is protected with secure infrastructure, encrypted connections and regular reliability and security monitoring.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Does the platform support team collaboration?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Yes, team members can collaborate through shared access, organized workflows and role-based permissions.</p>
                        </div>
                    </div>
                </details>
            </div>

            <div class="space-y-4">
                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Is there a free trial available?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Yes, you can start with a free trial to explore the platform before choosing a paid plan.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Which payment methods are supported?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">We support major credit and debit cards, along with common online payment options depending on your region.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">Can I connect this platform with other tools?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Yes, the platform supports integrations with popular apps so you can connect your existing workflows without extra hassle.</p>
                        </div>
                    </div>
                </details>

                <details name="faq-accordion" class="group rounded-lg border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:bg-neutral-900">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 [&::-webkit-details-marker]:hidden">
                        <span class="text-sm font-medium text-neutral-100">What makes your platform different?</span>
                        <div class="shrink-0 rounded p-1 text-neutral-100 transition-colors hover:bg-neutral-800">
                            <svg class="block group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <svg class="hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                        </div>
                    </summary>
                    <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100">
                        <div class="overflow-hidden">
                            <p class="px-3.5 pb-3.5 text-sm leading-relaxed text-neutral-300">Our platform focuses on simplicity, speed and scalable tools so teams can launch faster and manage work more efficiently.</p>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default Faq

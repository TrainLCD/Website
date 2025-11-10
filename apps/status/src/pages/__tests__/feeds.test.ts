import { describe, it, expect } from "vitest";
import { GET as getRss } from "../rss.xml";
import { GET as getAtom } from "../atom.xml";

const readBody = async (response: Response) => response.text();
const buildContext = (url: string, lang?: string) => ({
  request: new Request(url, {
    headers: lang ? { "accept-language": lang } : undefined,
  }),
});

describe("RSS feed", () => {
  it("includes service status items and sets CORS headers", async () => {
    const response = await getRss(
      buildContext("https://status.trainlcd.app/rss.xml", "en")
    );
    const body = await readBody(response);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, HEAD"
    );
    expect(body).toContain("<category>service-status</category>");
    expect(body).toContain('guid isPermaLink="false">service:');
    expect(body).toContain("<category>incident</category>");
    expect(body).toContain("status update");
  });

  it("falls back to Japanese when Accept-Language prefers ja", async () => {
    const response = await getRss(
      buildContext("https://status.trainlcd.app/rss.xml", "ja-JP")
    );
    const body = await readBody(response);

    expect(body).toContain("の稼働状況");
  });
});

describe("Atom feed", () => {
  it("includes service entries alongside incidents and sets CORS headers", async () => {
    const response = await getAtom(
      buildContext("https://status.trainlcd.app/atom.xml", "en")
    );
    const body = await readBody(response);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, HEAD"
    );
    expect(body).toContain('category term="service-status"');
    expect(body).toContain('category term="incident"');
    expect(body).toContain("#service-");
    expect(body).toContain("status update");
  });

  it("renders Japanese content when Accept-Language includes ja", async () => {
    const response = await getAtom(
      buildContext("https://status.trainlcd.app/atom.xml", "ja")
    );
    const body = await readBody(response);

    expect(body).toContain("の稼働状況");
  });
});

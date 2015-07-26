using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gzip2.Controllers
{
    public class CompressController : ApiController
    {
        //// GET: api/Values
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Values/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Values
        public string Post([FromBody]string value)
        {
            var enc = System.Text.Encoding.UTF8;

            using (var mem = new System.IO.MemoryStream())
            using (var gzip = new System.IO.Compression.GZipStream(mem, System.IO.Compression.CompressionMode.Compress, true))
            using (var text = new System.IO.StreamWriter(gzip, enc, 0, true))
            {
                text.Write(value);
                text.Flush();


                mem.Flush();
                mem.Seek(0, System.IO.SeekOrigin.Begin);

                return System.Convert.ToBase64String(mem.ToArray());

            }

        }

        //// PUT: api/Values/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/Values/5
        //public void Delete(int id)
        //{
        //}
    }
}
